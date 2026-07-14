import { format } from "date-fns";
import mongoose, { FilterQuery } from "mongoose";

import { PurchaseOrder, PurchaseOrderDocument } from "../models/PurchaseOrder.model";
import { purchaseOrderRepository } from "../repositories/PurchaseOrderRepository";
import { PaginationOptions } from "../repositories/BaseRepository";
import { ApiError } from "../utils/ApiError";
import type { CreatePOInput, UpdatePOInput } from "../validators/purchaseOrder.validator";

async function generateOrderNumber(): Promise<string> {
  const dateStr = format(new Date(), "yyyyMMdd");
  const prefix = `PO-${dateStr}-`;
  const count = await PurchaseOrder.countDocuments({ orderNumber: { $regex: `^${prefix}` } });
  const seq = String(count + 1).padStart(4, "0");
  return `${prefix}${seq}`;
}

export interface POFilters {
  status?: string;
  vendorId?: string;
  search?: string;
}

const VALID_TRANSITIONS: Record<string, string[]> = {
  DRAFT: ["SENT", "CANCELLED"],
  SENT: ["ACKNOWLEDGED", "CANCELLED"],
  ACKNOWLEDGED: ["DELIVERED", "DISPUTED", "CANCELLED"],
  DELIVERED: [],
  CANCELLED: [],
  DISPUTED: ["DELIVERED", "CANCELLED"],
};

export const purchaseOrderService = {
  async create(userId: string, orgId: string, data: CreatePOInput) {
    const orderNumber = await generateOrderNumber();
    const subtotal = data.items.reduce((sum, item) => sum + item.quantity * item.actualUnitPrice, 0);
    const tax = subtotal * 0.1;
    const shipping = data.shipping ?? 0;
    const total = subtotal + tax + shipping;

    const po = await PurchaseOrder.create({
      ...data,
      orderNumber,
      subtotal,
      tax,
      shipping,
      total,
      organizationId: new mongoose.Types.ObjectId(orgId),
      createdBy: new mongoose.Types.ObjectId(userId),
      vendorId: new mongoose.Types.ObjectId(data.vendorId),
      purchaseRequestId: data.purchaseRequestId
        ? new mongoose.Types.ObjectId(data.purchaseRequestId)
        : undefined,
    });
    return po.toJSON();
  },

  async findAll(orgId: string, filters: POFilters, pagination: PaginationOptions) {
    const query: FilterQuery<PurchaseOrderDocument> = {};
    if (filters.status) query.status = filters.status;
    if (filters.vendorId) query.vendorId = new mongoose.Types.ObjectId(filters.vendorId);
    if (filters.search) {
      query.$or = [{ orderNumber: { $regex: filters.search, $options: "i" } }];
    }
    return purchaseOrderRepository.findByOrg(orgId, query, pagination);
  },

  async findById(id: string, orgId: string) {
    const po = await PurchaseOrder.findOne({ _id: id, organizationId: orgId, deletedAt: null })
      .populate("vendorId", "name code email country")
      .populate("purchaseRequestId", "requestNumber title")
      .populate("createdBy", "firstName lastName email")
      .exec();
    if (!po) throw ApiError.notFound("Purchase Order");
    return po.toJSON();
  },

  async update(id: string, orgId: string, data: UpdatePOInput) {
    const po = await PurchaseOrder.findOne({ _id: id, organizationId: orgId, deletedAt: null }).exec();
    if (!po) throw ApiError.notFound("Purchase Order");
    if (!["DRAFT", "SENT"].includes(po.status)) {
      throw ApiError.badRequest("Only DRAFT or SENT orders can be updated");
    }
    if (data.items) {
      const subtotal = data.items.reduce((sum, item) => sum + item.quantity * item.actualUnitPrice, 0);
      const tax = subtotal * 0.1;
      const shipping = data.shipping ?? po.shipping;
      Object.assign(po, data, { subtotal, tax, shipping, total: subtotal + tax + shipping });
    } else {
      Object.assign(po, data);
    }
    await po.save();
    return po.toJSON();
  },

  async updateStatus(id: string, orgId: string, status: string) {
    const po = await PurchaseOrder.findOne({ _id: id, organizationId: orgId, deletedAt: null }).exec();
    if (!po) throw ApiError.notFound("Purchase Order");
    const allowed = VALID_TRANSITIONS[po.status] ?? [];
    if (!allowed.includes(status)) {
      throw ApiError.badRequest(`Cannot transition from ${po.status} to ${status}`);
    }
    po.status = status as PurchaseOrderDocument["status"];
    await po.save();
    return po.toJSON();
  },
};
