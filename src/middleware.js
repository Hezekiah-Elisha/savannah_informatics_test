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
  console.log("Middleware running");

  console.log("Pathname:", req.nextUrl.pathname);
  const session = await auth(req);
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  if (session && isProtectedRoute) {
    return NextResponse.redirect(new URL("/landing", req.url));
  }

  if (!session && isPublicRoute) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
