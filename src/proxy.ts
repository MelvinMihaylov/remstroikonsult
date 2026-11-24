import { type NextRequest, NextResponse } from "next/server";

import { PAST_DUE_COOKIE } from "./components/billing/cookie";

/** Open remstroikonsult.com/?billing=dulzhenie once to switch the notice on. */
const PAST_DUE_TOKEN = "dulzhenie";

/**
 * `?billing=dulzhenie` turns the past-due notice on for whoever opens it and
 * it stays on for a year; `?billing=` (or any other value) turns it off again.
 * Nothing else shows the notice, so the public site is unaffected.
 */
export function proxy(request: NextRequest) {
  const requested = request.nextUrl.searchParams.get("billing");

  if (requested === null) {
    return NextResponse.next();
  }

  const destination = request.nextUrl.clone();
  destination.searchParams.delete("billing");
  const response = NextResponse.redirect(destination);

  if (requested === PAST_DUE_TOKEN) {
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
