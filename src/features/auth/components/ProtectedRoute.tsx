

"use client"

import { useEffect } from 'react'
import { useAuth } from "@/stores/Auth-store/Auth-srore";
import { useRouter } from "next/navigation"; 

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const user = useAuth((state) => state.user);

  
 useEffect(() => {
    if (!user) {
      router.replace('/auth/login')
    }
  }, [user, router])

  // While checking auth, you can return null or a loader
  if (!user) {
    return null // or a spinner/loading UI
  }

  return <>{children}</>
}
