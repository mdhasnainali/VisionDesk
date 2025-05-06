import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Camera } from "lucide-react";
import Link from "next/link";

export function AppSidebarHeader() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Link href="/">
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
          >
            <div className="size-4 flex items-center justify-center p-2 box-content rounded-full bg-gradient-to-r from-cyan-400 to-violet-500">
              <Camera color="white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                VisionDesk AI
              </h1>
            </div>
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
