import mongoose, { FilterQuery } from "mongoose";

import { Vendor, VendorDocument } from "../models/Vendor.model";
import { vendorRepository } from "../repositories/VendorRepository";
import { PaginationOptions } from "../repositories/BaseRepository";
import { ApiError } from "../utils/ApiError";
import type { CreateVendorInput, UpdateVendorInput } from "../validators/vendor.validator";

async function generateVendorCode(orgId: string): Promise<string> {
  const count = await Vendor.countDocuments({ organizationId: orgId });
  return `VND-${String(count + 1).padStart(4, "0")}`;
}

export interface VendorFilters {
  status?: string;
  category?: string;
  search?: string;
}

export const vendorService = {
  async create(orgId: string, data: CreateVendorInput) {
    const code = await generateVendorCode(orgId);
    const vendor = await Vendor.create({
      ...data,
      code,
      organizationId: new mongoose.Types.ObjectId(orgId),
    });
    return vendor.toJSON();
  },

  async findAll(orgId: string, filters: VendorFilters, pagination: PaginationOptions) {
    const query: FilterQuery<VendorDocument> = {};
    if (filters.status) query.status = filters.status;
    if (filters.category) query.category = filters.category;
    if (filters.search) {
      return vendorRepository.search(filters.search, orgId, pagination);
    }
    return vendorRepository.findByOrg(orgId, query, pagination);
  },

  async findById(id: string, orgId: string) {
    const vendor = await Vendor.findOne({ _id: id, organizationId: orgId, deletedAt: null }).exec();
    if (!vendor) throw ApiError.notFound("Vendor");
    return vendor.toJSON();
  },

  async update(id: string, orgId: string, data: UpdateVendorInput) {
    const vendor = await Vendor.findOneAndUpdate(
      { _id: id, organizationId: orgId, deletedAt: null },
      data,
      { new: true },
    ).exec();
    if (!vendor) throw ApiError.notFound("Vendor");
    return vendor.toJSON();
  },

  async delete(id: string, orgId: string) {
    const vendor = await Vendor.findOneAndUpdate(
      { _id: id, organizationId: orgId, deletedAt: null },
      { deletedAt: new Date() },
      { new: true },
    ).exec();
    if (!vendor) throw ApiError.notFound("Vendor");
  },
};
