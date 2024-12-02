"use client"
import { Home  } from "lucide-react";
import Link from 'next/link';
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { icon: Home, label: "Home", href: "/dashboard" },
  ];

  return (
      <div className="flex h-screen bg-gradient-to-b from-white via-gray-50 to-white dark:from-black dark:via-gray-900 dark:to-black">
        {/* Sidebar */}
        <aside className="w-64 bg-white/95 dark:bg-gray-900/95 border-r border-gray-200 dark:border-gray-800">
          <div className="p-6 flex items-center gap-4">
            <img src="/logo.png" alt="Logo" className="h-8 cursor-pointer" />
          </div>
          <nav className="space-y-1 px-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-white"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900 p-8">
          {children}
        </main>
      </div>
  );
}
