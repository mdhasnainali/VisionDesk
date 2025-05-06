import { Navbar } from "@/components/home/Home";
import BorderGlow from "@/components/ui/BorderGlow";
import { IsAuthenticated } from "@/hooks/isAuthenticated";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <IsAuthenticated>
      <div className="relative mx-auto  flex  flex-col items-center justify-center mb-2">
        <Navbar />
      </div>
      <div className="container mx-auto p-4 dark:backdrop-blur-[3.5px] bg-white dark:bg-transparent rounded-xl border shadow-md z-10 ">
        <section>
          <div className=" mx-auto  flex max-w-7xl flex-col items-center justify-center">
            <BorderGlow />
          </div>
          {children}
        </section>
      </div>
    </IsAuthenticated>
  );
}
