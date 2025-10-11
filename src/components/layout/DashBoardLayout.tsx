
import Sidebar from "../Sidebar";  
import Navbar from "../Navbar"; 

import ProtectedRoute from "@/features/auth/components/ProtectedRoute"; 

export default function DashBoradLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <ProtectedRoute>
      <div className="flex">
        <Sidebar />
        <main className="w-full overflow-auto h-screen dark:bg-secondary-dark">
          <Navbar />
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}
