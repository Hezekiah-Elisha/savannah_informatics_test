import { auth } from "./auth";
import { NextResponse } from "next/server";
// export

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

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const { pathname } = request.nextUrl;
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    const session = auth(request);
    if (!session) {
      return NextResponse.redirect(new URL("/landing", request.url));
    }
  }

  if (isPublicRoute) {
    const session = auth(request);
    if (session) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}
