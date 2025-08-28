import { NextRequest, NextResponse } from "next/server";

export const middleware = (request: NextRequest) => {
  const token = request?.cookies?.get("token")?.value
  const publicPaths = ["/signin", "/signup", "/forgot-password", "/reset-password"]
  const isPublicPaths = publicPaths.includes(request.nextUrl.pathname)
  if (!token && !isPublicPaths) {
    return NextResponse.redirect(new URL("/signin", request.url))
  }
  if (token && isPublicPaths) {
    return NextResponse.redirect(new URL("/", request.url))
  }
  return NextResponse.next()

}
export const config = {
  matcher: [
    "/",
    "/assets",
    "/debts",
    "/insurance",
    "/utilities",
    "/transition",
    "/signin",
    "/signup",
    "/forgot-password",
    "/reset-password"
  ]
}