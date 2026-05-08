import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import FinanceTracker from "@/components/FinanceTracker";

export default async function HomePage() {
  const session = await auth();
  if (!session) redirect("/login");

  return <FinanceTracker />;
}
