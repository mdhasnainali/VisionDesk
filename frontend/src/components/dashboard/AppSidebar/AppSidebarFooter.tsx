"use client";

import {
  SidebarMenu,
  SidebarMenuItem
} from "@/components/ui/sidebar";
import { selectGetProfile } from "@/redux/allStateSlice";
import { useAppSelector } from "@/redux/hooks";
import Profile from "../../Profile/Profile";

export function AppSidebarFooter({ state }: { state: string }) {
  const user = useAppSelector(selectGetProfile);

  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex items-center gap-3">
        <Profile />
        {state === "expanded" && (
          <div className="flex flex-col">
            <span className="font-medium text-sm">{user?.name || "VisionDesk AI"} </span>
            <p className="text-xs hover:underline">{user?.email || "visionDeskaI@gmail.com"} </p>
          </div>
        )}
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
