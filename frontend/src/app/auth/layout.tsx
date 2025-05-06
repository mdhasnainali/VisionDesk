"use client";

import { IsAuthenticatedInAuth } from "@/hooks/isAuthenticated";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <IsAuthenticatedInAuth>{children}</IsAuthenticatedInAuth>;
}
