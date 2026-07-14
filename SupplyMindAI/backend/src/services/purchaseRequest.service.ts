import { format } from "date-fns";
import mongoose, { FilterQuery } from "mongoose";

import { PurchaseRequest, PurchaseRequestDocument } from "../models/PurchaseRequest.model";
import { purchaseRequestRepository } from "../repositories/PurchaseRequestRepository";
import { PaginationOptions } from "../repositories/BaseRepository";
import { ApiError } from "../utils/ApiError";
import type { CreatePRInput, UpdatePRInput, ApprovePRInput, RejectPRInput } from "../validators/purchaseRequest.validator";

async function generateRequestNumber(): Promise<string> {
  const dateStr = format(new Date(), "yyyyMMdd");
  const prefix = `PR-${dateStr}-`;
  const count = await PurchaseRequest.countDocuments({
    requestNumber: { $regex: `^${prefix}` },
  });
  const seq = String(count + 1).padStart(4, "0");
  return `${prefix}${seq}`;
}

export interface PRFilters {
  status?: string;
  urgency?: string;
  requesterId?: string;
  startDate?: string;
  endDate?: string;
  search?: string;
}

export const purchaseRequestService = {
  async create(requesterId: string, orgId: string, data: CreatePRInput) {
    const requestNumber = await generateRequestNumber();
    const pr = await PurchaseRequest.create({
      ...data,
      requestNumber,
      requesterId: new mongoose.Types.ObjectId(requesterId),
      organizationId: new mongoose.Types.ObjectId(orgId),
      status: "DRAFT",
    });
    return pr.toJSON();
  },

  async findAll(orgId: string, filters: PRFilters, pagination: PaginationOptions) {
    const query: FilterQuery<PurchaseRequestDocument> = {};
    if (filters.status) query.status = filters.status;
    if (filters.urgency) query.urgency = filters.urgency;
    if (filters.requesterId) query.requesterId = new mongoose.Types.ObjectId(filters.requesterId);
    if (filters.startDate || filters.endDate) {
      query.createdAt = {};
      if (filters.startDate) query.createdAt.$gte = new Date(filters.startDate);
      if (filters.endDate) query.createdAt.$lte = new Date(filters.endDate);
    }
    if (filters.search) {
      query.$or = [
        { title: { $regex: filters.search, $options: "i" } },
        { requestNumber: { $regex: filters.search, $options: "i" } },
      ];
    }
    return purchaseRequestRepository.findByOrg(orgId, query, pagination);
  },

  async findById(id: string, orgId: string) {
    const pr = await PurchaseRequest.findOne({
      _id: id,
      organizationId: orgId,
      deletedAt: null,
    })
      .populate("requesterId", "firstName lastName email avatar")
      .populate("approvedBy", "firstName lastName email")
      .populate("rejectedBy", "firstName lastName email")
      .populate("approvalWorkflow.approverId", "firstName lastName email")
      .exec();
    if (!pr) throw ApiError.notFound("Purchase Request");
    return pr.toJSON();
  },

  async update(id: string, requesterId: string, orgId: string, data: UpdatePRInput) {
    const pr = await PurchaseRequest.findOne({ _id: id, organizationId: orgId, deletedAt: null }).exec();
    if (!pr) throw ApiError.notFound("Purchase Request");
    if (String(pr.requesterId) !== requesterId) throw ApiError.forbidden("Not the owner");
    if (pr.status !== "DRAFT") throw ApiError.badRequest("Only DRAFT requests can be updated");

    Object.assign(pr, data);
    await pr.save();
    return pr.toJSON();
  },

  async submit(id: string, requesterId: string, orgId: string) {
    const pr = await PurchaseRequest.findOne({ _id: id, organizationId: orgId, deletedAt: null }).exec();
    if (!pr) throw ApiError.notFound("Purchase Request");
    if (String(pr.requesterId) !== requesterId) throw ApiError.forbidden("Not the owner");
    if (pr.status !== "DRAFT") throw ApiError.badRequest("Only DRAFT requests can be submitted");

    // Stub: 2-level approval workflow
    pr.status = "PENDING";
    pr.approvalWorkflow = [
      { approverId: new mongoose.Types.ObjectId(), status: "PENDING", level: 1, comment: undefined, actedAt: undefined },
    ];
    await pr.save();
    return pr.toJSON();
  },

  async approve(id: string, approverId: string, orgId: string, data: ApprovePRInput) {
    const pr = await PurchaseRequest.findOne({ _id: id, organizationId: orgId, deletedAt: null }).exec();
    if (!pr) throw ApiError.notFound("Purchase Request");
    if (pr.status !== "PENDING") throw ApiError.badRequest("Only PENDING requests can be approved");

    const step = pr.approvalWorkflow.find((s) => String(s.approverId) === approverId);
    if (!step) throw ApiError.forbidden("Not in approval workflow");

    step.status = "APPROVED";
    step.comment = data.comment;
    step.actedAt = new Date();

    const allApproved = pr.approvalWorkflow.every((s) => s.status === "APPROVED");
    if (allApproved) {
      pr.status = "APPROVED";
      pr.approvedBy = new mongoose.Types.ObjectId(approverId);
      pr.approvedAt = new Date();
    }

    await pr.save();
    return pr.toJSON();
  },

  async reject(id: string, approverId: string, orgId: string, data: RejectPRInput) {
    const pr = await PurchaseRequest.findOne({ _id: id, organizationId: orgId, deletedAt: null }).exec();
    if (!pr) throw ApiError.notFound("Purchase Request");
    if (pr.status !== "PENDING") throw ApiError.badRequest("Only PENDING requests can be rejected");

    pr.status = "REJECTED";
    pr.rejectedBy = new mongoose.Types.ObjectId(approverId);
    pr.rejectedAt = new Date();
    pr.rejectionReason = data.reason;

    const step = pr.approvalWorkflow.find((s) => String(s.approverId) === approverId);
    if (step) {
      step.status = "REJECTED";
      step.comment = data.reason;
      step.actedAt = new Date();
    }

    await pr.save();
    return pr.toJSON();
  },

  async cancel(id: string, requesterId: string, orgId: string) {
    const pr = await PurchaseRequest.findOne({ _id: id, organizationId: orgId, deletedAt: null }).exec();
    if (!pr) throw ApiError.notFound("Purchase Request");
    if (String(pr.requesterId) !== requesterId) throw ApiError.forbidden("Not the owner");
    if (!["DRAFT", "PENDING"].includes(pr.status)) {
      throw ApiError.badRequest("Only DRAFT or PENDING requests can be cancelled");
    }

    pr.status = "CANCELLED";
    await pr.save();
    return pr.toJSON();
  },

  async addComment(id: string, userId: string, orgId: string, text: string) {
    const pr = await PurchaseRequest.findOne({ _id: id, organizationId: orgId, deletedAt: null }).exec();
    if (!pr) throw ApiError.notFound("Purchase Request");

    pr.comments.push({
      userId: new mongoose.Types.ObjectId(userId),
      text,
      createdAt: new Date(),
    });
    await pr.save();
    return pr.toJSON();
  },

  async addAttachment(id: string, userId: string, orgId: string, fileData: {
    filename: string;
    originalName: string;
    mimeType: string;
    size: number;
    url: string;
  }) {
    const pr = await PurchaseRequest.findOne({ _id: id, organizationId: orgId, deletedAt: null }).exec();
    if (!pr) throw ApiError.notFound("Purchase Request");

    pr.attachments.push({
      ...fileData,
      uploadedBy: new mongoose.Types.ObjectId(userId),
      uploadedAt: new Date(),
    });
    await pr.save();
    return pr.toJSON();
  },

  async destroy(id: string, _orgId: string) {
    const pr = await purchaseRequestRepository.deleteById(id);
    if (!pr) throw ApiError.notFound("Purchase Request");
    return pr.toJSON();
  },
};
