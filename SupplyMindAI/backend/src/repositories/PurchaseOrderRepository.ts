import { FilterQuery } from "mongoose";

import { PurchaseOrder, PurchaseOrderDocument, POStatus } from "../models/PurchaseOrder.model";
import { BaseRepository, PaginationOptions, PaginatedResult } from "./BaseRepository";

export class PurchaseOrderRepository extends BaseRepository<PurchaseOrderDocument> {
  constructor() {
    super(PurchaseOrder as unknown as import("mongoose").Model<PurchaseOrderDocument>);
  }

  async findByOrg(
    orgId: string,
    filters: FilterQuery<PurchaseOrderDocument>,
    pagination: PaginationOptions,
  ): Promise<PaginatedResult<PurchaseOrderDocument>> {
    return this.findAll({ ...filters, organizationId: orgId }, pagination);
  }

  async findByVendor(
    vendorId: string,
    orgId: string,
    pagination: PaginationOptions,
  ): Promise<PaginatedResult<PurchaseOrderDocument>> {
    return this.findAll({ vendorId, organizationId: orgId }, pagination);
  }

  async findByStatus(
    status: POStatus,
    orgId: string,
    pagination: PaginationOptions,
  ): Promise<PaginatedResult<PurchaseOrderDocument>> {
    return this.findAll({ status, organizationId: orgId }, pagination);
  }
}

export const purchaseOrderRepository = new PurchaseOrderRepository();
