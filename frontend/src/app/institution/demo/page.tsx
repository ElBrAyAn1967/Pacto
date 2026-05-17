import { redirect } from "next/navigation";

export default function InstitutionDemo() {
  // Redirect to dashboard with demo mode
  redirect("/institution/dashboard");
}
