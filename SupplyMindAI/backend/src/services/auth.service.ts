import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

import { config } from "../config";
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET, jwtAccessSignOptions, jwtRefreshSignOptions } from "../config/jwt";
import { Organization } from "../models/Organization.model";
import { User } from "../models/User.model";
import { userRepository } from "../repositories/UserRepository";
import { ApiError } from "../utils/ApiError";
import { logger } from "../utils/logger";
import type { RegisterInput, LoginInput, UpdateMeInput } from "../validators/auth.validator";

function generateAccessToken(userId: string, email: string, role: string, orgId: string): string {
  return jwt.sign({ sub: userId, email, role, orgId }, JWT_ACCESS_SECRET, jwtAccessSignOptions);
}

function generateRefreshToken(userId: string): string {
  return jwt.sign({ sub: userId }, JWT_REFRESH_SECRET, jwtRefreshSignOptions);
}

export const authService = {
  async register(data: RegisterInput) {
    const existing = await userRepository.findByEmail(data.email);
    if (existing) throw ApiError.conflict("Email already in use");

    // Create or find organization
    let orgId: import("mongoose").Types.ObjectId;

    if (data.organizationName) {
      const slug = data.organizationName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
      const orgIdStr = uuidv4();
      const org = await Organization.create({
        organizationId: orgIdStr,
        name: data.organizationName,
        slug: `${slug}-${Date.now()}`,
        plan: "FREE",
      });
      orgId = org._id as import("mongoose").Types.ObjectId;
    } else {
      // Use a default org or throw
      const defaultOrg = await Organization.findOne({});
      if (!defaultOrg) throw ApiError.badRequest("Organization name is required");
      orgId = defaultOrg._id as import("mongoose").Types.ObjectId;
    }

    const verificationToken = uuidv4();
    const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h

    const user = new User({
      email: data.email,
      passwordHash: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role,
      organizationId: orgId,
      emailVerificationToken: verificationToken,
      emailVerificationExpires: verificationExpires,
    });

    await user.save();

    // Mock email
    if (config.isDev) {
      logger.info(`[DEV] Email verification token for ${data.email}: ${verificationToken}`);
    }

    return user.toJSON();
  },

  async login(data: LoginInput) {
    const user = await userRepository.findByEmail(data.email);
    if (!user) throw ApiError.unauthorized("Invalid email or password");

    const isValid = await user.comparePassword(data.password);
    if (!isValid) throw ApiError.unauthorized("Invalid email or password");

    if (!user.isEmailVerified) {
      throw new ApiError(403, "Please verify your email before logging in", "EMAIL_NOT_VERIFIED");
    }

    if (!user.isActive) throw ApiError.forbidden("Account is deactivated");

    const accessToken = generateAccessToken(
      String(user._id),
      user.email,
      user.role,
      String(user.organizationId),
    );
    const refreshToken = generateRefreshToken(String(user._id));

    // Rotate refresh tokens (max 5)
    const tokens = (user.refreshTokens || []).slice(-4);
    tokens.push(refreshToken);
    await userRepository.updateRefreshTokens(String(user._id), tokens);

    user.lastLoginAt = new Date();
    await user.save();

    return { user: user.toJSON(), accessToken, refreshToken };
  },

  async refreshTokens(oldRefreshToken: string) {
    const user = await userRepository.findByRefreshToken(oldRefreshToken);
    if (!user) throw ApiError.unauthorized("Invalid refresh token");

    // Verify token signature
    try {
      jwt.verify(oldRefreshToken, JWT_REFRESH_SECRET);
    } catch {
      // Revoke all tokens if tampered
      await userRepository.updateRefreshTokens(String(user._id), []);
      throw ApiError.unauthorized("Invalid refresh token");
    }

    const accessToken = generateAccessToken(
      String(user._id),
      user.email,
      user.role,
      String(user.organizationId),
    );
    const newRefreshToken = generateRefreshToken(String(user._id));

    // Rotate: remove old, add new
    const tokens = (user.refreshTokens || []).filter((t) => t !== oldRefreshToken);
    tokens.push(newRefreshToken);
    await userRepository.updateRefreshTokens(String(user._id), tokens.slice(-5));

    return { accessToken, refreshToken: newRefreshToken };
  },

  async logout(userId: string, refreshToken: string) {
    const user = await userRepository.findById(userId);
    if (!user) return;
    const tokens = (user.refreshTokens || []).filter((t) => t !== refreshToken);
    await userRepository.updateRefreshTokens(userId, tokens);
  },

  async forgotPassword(email: string) {
    const user = await userRepository.findByEmail(email);
    if (!user) return; // Don't reveal if email exists

    const resetToken = uuidv4();
    const resetExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await User.findByIdAndUpdate(user._id, {
      passwordResetToken: resetToken,
      passwordResetExpires: resetExpires,
    });

    const resetUrl = `${config.clientUrl}/reset-password?token=${resetToken}`;
    logger.info(`[DEV] Password reset URL for ${email}: ${resetUrl}`);
    return resetUrl;
  },

  async resetPassword(token: string, newPassword: string) {
    const user = await userRepository.findByResetToken(token);
    if (!user) throw ApiError.badRequest("Invalid or expired reset token");

    user.passwordHash = newPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.refreshTokens = [];
    await user.save();
  },

  async verifyEmail(token: string) {
    const user = await userRepository.findByVerificationToken(token);
    if (!user) throw ApiError.badRequest("Invalid or expired verification token");

    await User.findByIdAndUpdate(user._id, {
      isEmailVerified: true,
      emailVerificationToken: undefined,
      emailVerificationExpires: undefined,
    });
  },

  async getMe(userId: string) {
    const user = await User.findById(userId).exec();
    if (!user) throw ApiError.notFound("User");
    return user.toJSON();
  },

  async updateMe(userId: string, data: UpdateMeInput) {
    const user = await User.findByIdAndUpdate(userId, data, { new: true }).exec();
    if (!user) throw ApiError.notFound("User");
    return user.toJSON();
  },
};
