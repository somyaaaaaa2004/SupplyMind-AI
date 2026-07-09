/**
 * JWT helper configuration.
 * Sign and verify options are co-located here for consistency.
 */

import type { SignOptions, VerifyOptions } from "jsonwebtoken";

import { config } from "./index";

export const jwtAccessSignOptions: SignOptions = {
  expiresIn: config.jwt.accessExpiresIn as SignOptions["expiresIn"],
  issuer: "supplymind.ai",
  audience: "supplymind-client",
};

export const jwtRefreshSignOptions: SignOptions = {
  expiresIn: config.jwt.refreshExpiresIn as SignOptions["expiresIn"],
  issuer: "supplymind.ai",
  audience: "supplymind-refresh",
};

export const jwtVerifyOptions: VerifyOptions = {
  issuer: "supplymind.ai",
  audience: "supplymind-client",
};

export const refreshVerifyOptions: VerifyOptions = {
  issuer: "supplymind.ai",
  audience: "supplymind-refresh",
};

export const JWT_ACCESS_SECRET = config.jwt.accessSecret;
export const JWT_REFRESH_SECRET = config.jwt.refreshSecret;
