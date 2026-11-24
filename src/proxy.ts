import { type NextRequest, NextResponse } from "next/server";

import { PAST_DUE_COOKIE } from "./components/billing/cookie";

/**
 * Turns the past-due notice on for one visitor: `?billing=<PAST_DUE_TOKEN>`
 * sets the cookie, `?billing=` (or any other value) clears it. The token is
 * required, so without PAST_DUE_TOKEN set the gate does nothing and no visitor
 * can ever see the notice.
 */
export function proxy(request: NextRequest) {
  const token = process.env.PAST_DUE_TOKEN;
  const requested = request.nextUrl.searchParams.get("billing");

  if (!token || requested === null) {
    return NextResponse.next();
  }

  const destination = request.nextUrl.clone();
  destination.searchParams.delete("billing");
  const response = NextResponse.redirect(destination);

  if (requested === token) {
    response.cookies.set(PAST_DUE_COOKIE, "1", {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365,
    });
  } else {
    response.cookies.delete(PAST_DUE_COOKIE);
  }

  return response;
}

export const config = {
  matcher: "/((?!_next/|.*\\.).*)",
};
