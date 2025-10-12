"use client";

import { useEffect } from "react";
import { useAuth } from "@/stores/Auth-store/Auth-srore";
import { useRouter } from "next/navigation";
import { useHydration } from "@/hooks/useHydration";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const hydrated = useHydration();
  const router = useRouter();
  const user = useAuth((state) => state.user);

  useEffect(() => {

    if (!hydrated)  return;

    if (!user) {    
      router.replace("/auth/login");
    }
  }, [user, router, hydrated]);

  // While checking auth, you can return null or a loader
  if (!user) {
    return null; // or a spinner/loading UI
  }

  return <>{children}</>;
}
