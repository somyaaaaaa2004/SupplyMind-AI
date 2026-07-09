import { type NextRequest, NextResponse } from "next/server";

/**
 * Next.js Middleware
 *
 * Responsibilities:
 *  - JWT / session validation
 *  - Redirect unauthenticated users to /login
 *  - Redirect authenticated users away from /login
 *  - RBAC path-level guards (future)
 *
 * NOTE: Authentication logic is a stub.
 *       Implement token validation in the features phase.
 */

// Routes that do NOT require authentication
const PUBLIC_ROUTES = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
];

// Routes that are always accessible (assets, API, etc.)
const ALWAYS_ALLOWED = ["/_next", "/favicon.ico", "/api"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow static/API paths through
  if (ALWAYS_ALLOWED.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  /**
   * STUB: Real auth validation must verify the JWT signature server-side
   * (e.g. via jose `jwtVerify`). The presence of a cookie alone is NOT
   * sufficient — replace this before any production use.
   *
   * Pattern to implement:
   *   import { jwtVerify } from "jose";
   *   const secret = new TextEncoder().encode(process.env.JWT_ACCESS_SECRET);
   *   const { payload } = await jwtVerify(token, secret);
   */
  const token = request.cookies.get("supplymind_access_token")?.value;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isAuthenticated = false; // Always redirect to login until real JWT validation is implemented

  const isPublicRoute = PUBLIC_ROUTES.some((r) => pathname.startsWith(r));

  if (!isAuthenticated && !isPublicRoute) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthenticated && isPublicRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
