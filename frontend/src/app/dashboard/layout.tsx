import { AppSidebar } from "@/components/dashboard/AppSidebar/AppSidebar";
import SidebarNavbar from "@/components/dashboard/AppSidebar/SidebarNavbar";
import BorderGlow from "@/components/ui/BorderGlow";
import { ParticleBackground } from "@/components/ui/particle-background";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { IsAuthenticated } from "@/hooks/isAuthenticated";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <IsAuthenticated>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <SidebarNavbar />
          <div className="container mx-auto p-4 dark:backdrop-blur-[3.5px] bg-white dark:bg-transparent rounded-xl border shadow-md z-10 ">
            <section>
              <div className=" mx-auto  flex max-w-7xl flex-col items-center justify-center">
                <BorderGlow />
              </div>
              {children}
            </section>
          </div>
          <ParticleBackground />
        </SidebarInset>
      </SidebarProvider>
    </IsAuthenticated>
  );
}
