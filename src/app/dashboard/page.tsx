"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "../context/UserContext";

export default function DashboardPage() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      if (user.role === "superadmin") {
        router.push("/dashboard/superadmin");
      } else if (user.role === "property-admin") {
        router.push("/dashboard/property-admin");
      }
    }
  }, [user, router]);

  return <p>Redirecting...</p>;
}
