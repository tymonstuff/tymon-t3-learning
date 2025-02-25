"use client";

import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoaded } = useUser();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    if (!isLoaded) return;

    if (!user) {
      redirect("/");
    } else {
      // Check if the user has admin role
      const userRole = user.publicMetadata?.role as string | undefined;
      setIsAdmin(userRole === "admin");

      if (userRole !== "admin") {
        redirect("/");
      }
    }
  }, [user, isLoaded]);

  // Show loading state while checking permissions
  if (!isLoaded || isAdmin === null) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="text-xl">Loading admin dashboard...</div>
      </div>
    );
  }

  // If user is admin, render children
  return (
    <div className="p-4">
      <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      </div>
      {children}
    </div>
  );
}
