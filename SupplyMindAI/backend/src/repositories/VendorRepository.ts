import { FilterQuery } from "mongoose";

import { Vendor, VendorDocument, VendorStatus } from "../models/Vendor.model";
import { BaseRepository, PaginationOptions, PaginatedResult } from "./BaseRepository";

export class VendorRepository extends BaseRepository<VendorDocument> {
  constructor() {
    super(Vendor as unknown as import("mongoose").Model<VendorDocument>);
  }

  async findByOrg(
    orgId: string,
    filters: FilterQuery<VendorDocument>,
    pagination: PaginationOptions,
  ): Promise<PaginatedResult<VendorDocument>> {
    return this.findAll({ ...filters, organizationId: orgId }, pagination);
  }

  async findByStatus(
    status: VendorStatus,
    orgId: string,
    pagination: PaginationOptions,
  ): Promise<PaginatedResult<VendorDocument>> {
    return this.findAll({ status, organizationId: orgId }, pagination);
  }

  async search(
    query: string,
    orgId: string,
    pagination: PaginationOptions,
  ): Promise<PaginatedResult<VendorDocument>> {
    const searchFilter: FilterQuery<VendorDocument> = {
      organizationId: orgId,
      $or: [
        { name: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
        { code: { $regex: query, $options: "i" } },
      ],
    };
    return this.findAll(searchFilter, pagination);
  }
}

export const vendorRepository = new VendorRepository();
