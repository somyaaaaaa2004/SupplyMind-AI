import { FilterQuery } from "mongoose";

import { User, UserDocument } from "../models/User.model";
import { BaseRepository } from "./BaseRepository";

export class UserRepository extends BaseRepository<UserDocument> {
  constructor() {
    super(User as unknown as import("mongoose").Model<UserDocument>);
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return User.findOne({ email: email.toLowerCase(), deletedAt: null })
      .select("+passwordHash +refreshTokens +emailVerificationToken +emailVerificationExpires +passwordResetToken +passwordResetExpires")
      .exec();
  }

  async findByResetToken(token: string): Promise<UserDocument | null> {
    return User.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: new Date() },
      deletedAt: null,
    } as FilterQuery<UserDocument>)
      .select("+passwordHash +refreshTokens +passwordResetToken +passwordResetExpires")
      .exec();
  }

  async findByVerificationToken(token: string): Promise<UserDocument | null> {
    return User.findOne({
      emailVerificationToken: token,
      emailVerificationExpires: { $gt: new Date() },
      deletedAt: null,
    } as FilterQuery<UserDocument>)
      .select("+emailVerificationToken +emailVerificationExpires")
      .exec();
  }

  async updateRefreshTokens(userId: string, refreshTokens: string[]): Promise<UserDocument | null> {
    return User.findByIdAndUpdate(
      userId,
      { refreshTokens },
      { new: true },
    ).exec();
  }

  async findByRefreshToken(token: string): Promise<UserDocument | null> {
    return User.findOne({
      refreshTokens: token,
      deletedAt: null,
    } as FilterQuery<UserDocument>)
      .select("+refreshTokens")
      .exec();
  }
}

export const userRepository = new UserRepository();
