import { format } from "date-fns";
import mongoose, { FilterQuery } from "mongoose";

import { RFQ, RFQDocument } from "../models/RFQ.model";
import { rfqRepository } from "../repositories/RFQRepository";
import { PaginationOptions } from "../repositories/BaseRepository";
import { ApiError } from "../utils/ApiError";
import { logger } from "../utils/logger";
import type { CreateRFQInput, SubmitQuoteInput } from "../validators/rfq.validator";

async function generateRFQNumber(): Promise<string> {
  const dateStr = format(new Date(), "yyyyMMdd");
  const prefix = `RFQ-${dateStr}-`;
  const count = await RFQ.countDocuments({ rfqNumber: { $regex: `^${prefix}` } });
  const seq = String(count + 1).padStart(4, "0");
  return `${prefix}${seq}`;
}

export interface RFQFilters {
  status?: string;
  search?: string;
}

export const rfqService = {
  async create(userId: string, orgId: string, data: CreateRFQInput) {
    const rfqNumber = await generateRFQNumber();
    const rfq = await RFQ.create({
      ...data,
      rfqNumber,
      vendorIds: data.vendorIds.map((id) => new mongoose.Types.ObjectId(id)),
      purchaseRequestId: data.purchaseRequestId
        ? new mongoose.Types.ObjectId(data.purchaseRequestId)
        : undefined,
      deadline: new Date(data.deadline),
      organizationId: new mongoose.Types.ObjectId(orgId),
      createdBy: new mongoose.Types.ObjectId(userId),
    });
    return rfq.toJSON();
  },

  async send(id: string, orgId: string) {
    const rfq = await RFQ.findOne({ _id: id, organizationId: orgId }).exec();
    if (!rfq) throw ApiError.notFound("RFQ");
    if (rfq.status !== "DRAFT") throw ApiError.badRequest("Only DRAFT RFQs can be sent");

    rfq.status = "SENT";
    await rfq.save();

    logger.info(`[MOCK] Sending RFQ ${rfq.rfqNumber} to ${rfq.vendorIds.length} vendors`);
    return rfq.toJSON();
  },

  async submitQuote(rfqId: string, vendorId: string, orgId: string, data: SubmitQuoteInput) {
    const rfq = await RFQ.findOne({ _id: rfqId, organizationId: orgId }).exec();
    if (!rfq) throw ApiError.notFound("RFQ");
    if (rfq.status !== "SENT") throw ApiError.badRequest("RFQ is not open for quotes");

    const isVendor = rfq.vendorIds.some((v) => String(v) === vendorId);
    if (!isVendor) throw ApiError.forbidden("Vendor not invited to this RFQ");

    const existingIdx = rfq.quotes.findIndex((q) => String(q.vendorId) === vendorId);
    const quote = {
      vendorId: new mongoose.Types.ObjectId(vendorId),
      unitPrices: data.unitPrices,
      totalPrice: data.totalPrice,
      deliveryDays: data.deliveryDays,
      notes: data.notes,
      submittedAt: new Date(),
      status: "SUBMITTED" as const,
    };

    if (existingIdx >= 0) {
      rfq.quotes[existingIdx] = quote;
    } else {
      rfq.quotes.push(quote);
    }
    await rfq.save();
    return rfq.toJSON();
  },

  async award(rfqId: string, vendorId: string, orgId: string) {
    const rfq = await RFQ.findOne({ _id: rfqId, organizationId: orgId }).exec();
    if (!rfq) throw ApiError.notFound("RFQ");
    if (!["SENT", "CLOSED"].includes(rfq.status)) {
      throw ApiError.badRequest("RFQ must be SENT or CLOSED to award");
    }

    rfq.awardedVendorId = new mongoose.Types.ObjectId(vendorId);
    rfq.status = "AWARDED";
    await rfq.save();
    return rfq.toJSON();
  },

  async findAll(orgId: string, filters: RFQFilters, pagination: PaginationOptions) {
    const query: FilterQuery<RFQDocument> = {};
    if (filters.status) query.status = filters.status;
    if (filters.search) {
      query.$or = [{ title: { $regex: filters.search, $options: "i" } }, { rfqNumber: { $regex: filters.search, $options: "i" } }];
    }
    return rfqRepository.findByOrg(orgId, query, pagination);
  },

  async findById(id: string, orgId: string) {
    const rfq = await RFQ.findOne({ _id: id, organizationId: orgId })
      .populate("vendorIds", "name code email")
      .populate("createdBy", "firstName lastName email")
      .populate("awardedVendorId", "name code email")
      .exec();
    if (!rfq) throw ApiError.notFound("RFQ");
    return rfq.toJSON();
  },
};
