/**
 * JWT authentication middleware.
 * Attaches the decoded user payload to req.user.
 */

import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { JWT_ACCESS_SECRET, jwtVerifyOptions } from "../config/jwt";
import { ApiError } from "../utils/ApiError";

// Extend Express Request with typed user
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export interface JwtPayload {
  sub: string;         // User ID
  email: string;
  role: string;
  orgId: string;
  iat: number;
  exp: number;
}

// ── Middleware ────────────────────────────────────────────────────────────────

/**
 * Protects routes — requires a valid access token in the Authorization header.
 */
export function authenticate(req: Request, _res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return next(ApiError.unauthorized("No access token provided"));
  }

  const token = authHeader.slice(7);

  try {
    const payload = jwt.verify(token, JWT_ACCESS_SECRET, jwtVerifyOptions) as JwtPayload;
    req.user = payload;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return next(ApiError.unauthorized("Access token expired"));
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return next(ApiError.unauthorized("Invalid access token"));
    }
    next(error);
  }
}

/**
 * Role-based access control guard.
 * Usage: router.get("/admin", authenticate, authorize("super_admin", "org_admin"), handler)
 */
export function authorize(...roles: string[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(ApiError.unauthorized());
    }
    if (!roles.includes(req.user.role)) {
      return next(ApiError.forbidden("Insufficient permissions"));
    }
    next();
  };
}
