"use client";

import { Home, Scan, History, Info, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function BottomNav() {
  const pathname = usePathname();

  const tabs = [
    { name: "Home", href: "/", icon: Home },
    { name: "Scan", href: "/scan", icon: Scan },
    { name: "History", href: "/history", icon: History },
    { name: "Project", href: "/about", icon: Info },
    { name: "Profile", href: "/profile", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 w-full max-w-md bg-white border-t border-medical-border z-50 pb-[env(safe-area-inset-bottom,0px)]">
      <div className="flex items-center justify-around h-16">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          const Icon = tab.icon;
          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={`flex flex-col items-center justify-center w-full h-full min-h-[48px] min-w-[48px] transition-colors ${
                isActive ? "text-medical-teal" : "text-slate-400 hover:text-medical-slate"
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-[10px] font-medium">{tab.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
