import AccountSidebar from "@/components/account/AccountSidebar";
import Breadcrumb from "@/components/account/Breadcrumb";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full bg-white dark:bg-gray-900">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 lg:px-0 py-6 md:py-10 lg:py-[100px]">
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "Profile" }]}
        />

        {/* Divider */}
        {/* <div className="w-full h-[1px] bg-[#E1E1E1] mt-[50px]" /> */}

        {/* Layout */}
        <div className="md:mt-10 flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="hidden lg:block w-[220px] flex-shrink-0">
            <AccountSidebar />
          </div>

          {/* Page Content */}
          <div className="flex-1 min-w-0">{children}</div>
        </div>
      </div>
    </div>
  );
}
