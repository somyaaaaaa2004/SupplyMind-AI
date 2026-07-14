import { FilterQuery } from "mongoose";

import { PurchaseRequest, PurchaseRequestDocument, PRStatus } from "../models/PurchaseRequest.model";
import { BaseRepository, PaginationOptions, PaginatedResult } from "./BaseRepository";

export class PurchaseRequestRepository extends BaseRepository<PurchaseRequestDocument> {
  constructor() {
    super(PurchaseRequest as unknown as import("mongoose").Model<PurchaseRequestDocument>);
  }

  async findByOrg(
    orgId: string,
    filters: FilterQuery<PurchaseRequestDocument>,
    pagination: PaginationOptions,
  ): Promise<PaginatedResult<PurchaseRequestDocument>> {
    return this.findAll({ ...filters, organizationId: orgId }, pagination);
  }

  async findByRequester(
    requesterId: string,
    pagination: PaginationOptions,
  ): Promise<PaginatedResult<PurchaseRequestDocument>> {
    return this.findAll({ requesterId }, pagination);
  }

  async findByStatus(
    status: PRStatus,
    orgId: string,
    pagination: PaginationOptions,
  ): Promise<PaginatedResult<PurchaseRequestDocument>> {
    return this.findAll({ status, organizationId: orgId }, pagination);
  }

  async findByNumber(requestNumber: string): Promise<PurchaseRequestDocument | null> {
    return PurchaseRequest.findOne({ requestNumber, deletedAt: null }).exec();
  }
}

export const purchaseRequestRepository = new PurchaseRequestRepository();
