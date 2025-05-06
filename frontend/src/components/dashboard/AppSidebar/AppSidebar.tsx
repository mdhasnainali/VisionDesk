"use client";

import { Banknote, DatabaseZapIcon, Video } from "lucide-react";
import * as React from "react";

import { AppSidebarContent } from "@/components/dashboard/AppSidebar/AppSidebarContent";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";

import { AppSidebarFooter } from "./AppSidebarFooter";
import { AppSidebarHeader } from "./AppSidebarHeader";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { setOpenMobile, openMobile, state } = useSidebar();
  return (
    <Sidebar collapsible="icon" {...props}>
      {/* Header */}
      <SidebarHeader>
        <AppSidebarHeader />
      </SidebarHeader>
      {/* Content */}
      <SidebarContent>
        <AppSidebarContent
          setOpenMobile={setOpenMobile}
          items={data.navMain}
          openMobile={openMobile}
        />
      </SidebarContent>
      {/* Footer */}
      <SidebarFooter>
        <AppSidebarFooter state={state} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
const data = {
  navMain: [
    {
      title: "Video ",
      url: "/",
      icon: Video,
      isActive: true,
      items: [
        {
          title: "Live Video",
          url: "/dashboard",
        },
        {
          title: "All-Desk",
          url: "/dashboard/all-desk",
        },
      ],
    },
    {
      title: "Report",
      url: "#",
      icon:DatabaseZapIcon ,
      isActive: true,
      items: [
        {
          title: "Overall Reports",
          url: "/dashboard/report",
        },
        {
          title: "Heat Map",
          url: "/dashboard/report/heatmap",
        },
      ],
    },
    {
      title: "Onboarding",
      url: "#",
      icon: Banknote,
      isActive: true,
      items: [
        {
          title: "Image-upload",
          url: "/onboarding",
        },
        {
          title: "Annotate Image",
          url: "/onboarding/annotate-image",
        },
      ],
    },
  ],
};
