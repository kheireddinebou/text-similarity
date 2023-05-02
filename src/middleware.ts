import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const redis = new Redis({
  url: process.env.REDIS_URL,
  token: process.env.REDIS_SECRET,
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(200, "1h"),
});

export default withAuth(
  async function middleware(req) {
    const pathname = req.nextUrl.pathname; // relative path

    // Manage rate limiting
    if (pathname.startsWith("/api")) {
      const ip = req.ip ?? "127.0.0.1";

      try {
        const { success } = await ratelimit.limit(ip);

        if (!success) {
          return NextResponse.json({ error: "Too many requests" });
        }

        return NextResponse.next();
      } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" });
      }
    }

    //   Manage route protection

    const token = await getToken({ req });
    const isAuth = !!token;
    const isAuthPage = pathname.startsWith("/login");
    const sensitiveRoutes = ["/dashboard"];

    if (isAuthPage && isAuth) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    if (!isAuth && sensitiveRoutes.some(route => pathname.startsWith(route))) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return null;
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    "/",
    "/login",
    "/documentation/:path*",
    "/dashboard/:path*",
    "/api/:path*",
  ],
};
