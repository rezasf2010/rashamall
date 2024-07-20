export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/admin/:path*", "/profile", "/products/saved"],
};

// import { getToken } from "next-auth/jwt";
// import { NextResponse } from "next/server";

// export async function middleware(req) {
//   const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

//   if (!token) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   // Fetch user from your database using the token email
//   const user = await fetch(
//     `${process.env.NEXTAUTH_URL}/api/users/${token.email}`,
//   ).then((res) => res.json());

//   if (user.role !== "admin") {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   return NextResponse.next();
// }
