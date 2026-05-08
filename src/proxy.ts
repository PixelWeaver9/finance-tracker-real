export { auth as proxy } from "@/lib/auth";

export const config = {
  matcher: [
    // Protect all routes except auth, api/auth, static files, and public assets
    "/((?!api/auth|login|register|_next/static|_next/image|favicon.ico).*)",
  ],
};
