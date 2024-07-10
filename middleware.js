export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/admin/dashboard",
    "/profile",
    "/products/saved",
    "/admin/dashboard/add",
    "/admin/dashboard/mag-add",
  ],
};
