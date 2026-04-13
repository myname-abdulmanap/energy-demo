import { auth } from "@/lib/auth";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import { SidebarProvider } from "@/components/providers/SidebarProvider";
import { HeaderSelectorProvider } from "@/components/providers/HeaderSelectorProvider";
import { DashboardContent } from "@/components/dashboard/DashboardContent";

const fallbackUser = {
  id: "guest-user",
  name: "Guest User",
  email: "guest@protectqube.local",
  role: "ADMIN",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const user = session?.user ?? fallbackUser;

  return (
    <SidebarProvider>
      <HeaderSelectorProvider>
        <div className="min-h-screen bg-background">
          <Sidebar user={user} />
          <DashboardContent user={user}>{children}</DashboardContent>
        </div>
      </HeaderSelectorProvider>
    </SidebarProvider>
  );
}
