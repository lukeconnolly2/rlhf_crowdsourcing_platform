import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

const publicRoutes = createRouteMatcher(['/', '/sign-in(.*)', '/sign-up(.*)']);
const adminRoutes = createRouteMatcher(['/admin(.*)']);
const developerRoutes = createRouteMatcher(['/dev(.*)']);

export default clerkMiddleware(async (auth, req) => {
  if (publicRoutes(req)) return; // allow public routes

  // Protect admin and developer routes
  if (adminRoutes(req)) {
    await auth.protect({ role: 'admin' });
  } else if (developerRoutes(req)) {
    await auth.protect({ role: 'developer' });
  } else {
    // Protect all other non-public routes
    await auth.protect();
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};