import { auth } from "../auth";
import { NextResponse } from "next/server";

const protectedRoutes = [
  "/",
  "/photos",
  "/photos/*",
  "/albums",
  "/albums/*",
  "/users",
  "/users/*",
];

const publicRoutes = ["/landing"];

export default async function middleware(req) {
  const session = await auth(req);
  const path = req.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route)
  );
  const isPublicRoute = publicRoutes.some((route) => path.startsWith(route));

  // Handle protected routes
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/landing", req.url));
  }

  // Handle public routes
  if (isPublicRoute && session) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Allow the request to proceed if no redirection is needed
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};