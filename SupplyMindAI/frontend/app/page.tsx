import { redirect } from "next/navigation";

/**
 * Root page – redirects to the dashboard.
 * Authentication guard is handled by middleware.
 */
export default function RootPage() {
  redirect("/dashboard");
}
