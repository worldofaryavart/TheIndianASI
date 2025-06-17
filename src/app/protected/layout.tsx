import Header from "@/components/ProtectedComponent/Header";
import SidebarPanel from "@/components/ProtectedComponent/SidePanel";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  

  return (
    <div className="flex flex-col h-screen">
      <Header className="flex-shrink-0" />
      <div className="flex flex-1 overflow-hidden">
        <SidebarPanel className="flex-shrink-0" />
        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
    </div>
  );
}
