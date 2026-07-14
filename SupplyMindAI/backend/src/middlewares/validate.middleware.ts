/**
 * Zod request validation middleware factory.
 * Validates req.body, req.params, or req.query against a Zod schema.
 */

import type { NextFunction, Request, Response } from "express";
import type { ZodSchema, ZodError } from "zod";

import { ApiError } from "../utils/ApiError";

type ValidationTarget = "body" | "params" | "query";

/**
 * Returns an Express middleware that validates `req[target]` against `schema`.
 *
 * @example
 * router.post("/", validate(createOrderSchema, "body"), createOrderHandler);
 */
export function validate<T>(schema: ZodSchema<T>, target: ValidationTarget = "body") {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req[target]);

    if (!result.success) {
      const zodError = result.error as ZodError;
      const errors: Record<string, string[]> = {};

      zodError.issues.forEach((issue) => {
        const path = issue.path.join(".") || "_root";
        if (!errors[path]) errors[path] = [];
        errors[path].push(issue.message);
      });

      return next(ApiError.validationError(errors));
    }

    // Replace raw input with parsed (coerced/stripped) values
    (req as unknown as Record<string, unknown>)[target] = result.data;
    next();
  };
}
