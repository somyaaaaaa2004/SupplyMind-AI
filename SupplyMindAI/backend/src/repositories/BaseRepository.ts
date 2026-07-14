import mongoose, { Document, FilterQuery, Model, UpdateQuery } from "mongoose";

export interface PaginationOptions {
  page: number;
  limit: number;
  sort?: string;
  order?: "asc" | "desc";
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
}

export class BaseRepository<T extends Document> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async findById(id: string): Promise<T | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return this.model.findOne({ _id: id, deletedAt: null } as FilterQuery<T>).exec();
  }

  async findAll(
    filters: FilterQuery<T> = {},
    pagination: PaginationOptions = { page: 1, limit: 20 },
  ): Promise<PaginatedResult<T>> {
    const { page, limit, sort = "createdAt", order = "desc" } = pagination;
    const skip = (page - 1) * limit;
    const sortDir = order === "asc" ? 1 : -1;
    const query: FilterQuery<T> = { ...filters, deletedAt: null } as FilterQuery<T>;

    const [data, total] = await Promise.all([
      this.model
        .find(query)
        .sort({ [sort]: sortDir } as { [key: string]: 1 | -1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      this.model.countDocuments(query).exec(),
    ]);

    return { data, total };
  }

  async create(data: Partial<T>): Promise<T> {
    const doc = new this.model(data);
    return doc.save() as Promise<T>;
  }

  async updateById(id: string, data: UpdateQuery<T>): Promise<T | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return this.model
      .findOneAndUpdate({ _id: id, deletedAt: null } as FilterQuery<T>, data, { new: true })
      .exec();
  }

  async deleteById(id: string): Promise<T | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return this.model
      .findOneAndUpdate(
        { _id: id, deletedAt: null } as FilterQuery<T>,
        { deletedAt: new Date() } as UpdateQuery<T>,
        { new: true },
      )
      .exec();
  }

  async count(filters: FilterQuery<T> = {}): Promise<number> {
    const query: FilterQuery<T> = { ...filters, deletedAt: null } as FilterQuery<T>;
    return this.model.countDocuments(query).exec();
  }
}
