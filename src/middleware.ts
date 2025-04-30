import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const url = req.nextUrl;
  const user = req.auth?.user;
  if (user && user.isActive === false && !url.pathname.startsWith("/verify")) {
    return NextResponse.redirect(new URL(`/verify/${user._id}`, req.url));
  }

  // Cho qua
  return NextResponse.next();
});
