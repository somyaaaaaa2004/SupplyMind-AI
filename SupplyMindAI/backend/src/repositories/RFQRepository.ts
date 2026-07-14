import { FilterQuery } from "mongoose";

import { RFQ, RFQDocument, RFQStatus } from "../models/RFQ.model";
import { BaseRepository, PaginationOptions, PaginatedResult } from "./BaseRepository";

export class RFQRepository extends BaseRepository<RFQDocument> {
  constructor() {
    super(RFQ as unknown as import("mongoose").Model<RFQDocument>);
  }

  async findByOrg(
    orgId: string,
    filters: FilterQuery<RFQDocument>,
    pagination: PaginationOptions,
  ): Promise<PaginatedResult<RFQDocument>> {
    return this.findAll({ ...filters, organizationId: orgId }, pagination);
  }

  async findByStatus(
    status: RFQStatus,
    orgId: string,
    pagination: PaginationOptions,
  ): Promise<PaginatedResult<RFQDocument>> {
    return this.findAll({ status, organizationId: orgId }, pagination);
  }
}

export const rfqRepository = new RFQRepository();
