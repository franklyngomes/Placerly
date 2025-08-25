"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Banknote,
  CreditCard,
  ShieldCheck,
  PlugZap,
  UserRoundCheck,
  X,
  LogOut,
} from "lucide-react";
import Image from "next/image";

interface SidebarProps {
  className?: string;
  id?: string;
  onNavigate?: () => void;
  onClose?: () => void;
}

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Assets", href: "/assets", icon: Banknote },
  { name: "Debts", href: "/debts", icon: CreditCard },
  { name: "Insurances", href: "/insurance", icon: ShieldCheck },
  { name: "Utilities", href: "/utilities", icon: PlugZap },
  { name: "Transition", href: "/transition", icon: UserRoundCheck },
];

export function Sidebar({ className, id, onNavigate, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      id={id}
      className={cn(
        "flex flex-col shrink-0 w-65 border-r border-white/10 bg-neutral-950/80 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/60",
        className
      )}
    >
      {/* Header */}
      <div className="px-5 py-4 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 flex items-center justify-center">
            <Image
            src="/logoPlacerly.svg"
            width={60}
            height={60}
            sizes="100vw"
            alt="Logo"
            />
          </div>
          <div className="text-sm">

            <div className="text-neutral-300 text-xs font-bold">Personal Finance Console</div>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-white/5 outline outline-white/10"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="px-3 py-4 space-y-2">
        {navigation.map((item, index) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <div key={item.name}>
              {index === 1 && (
                <div className="pt-2 pb-1 px-3 text-[11px] text-neutral-400 uppercase tracking-wider">
                  Manage
                </div>
              )}
              <Link
                href={item.href}
                onClick={onNavigate}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/5 text-neutral-300 hover:text-neutral-100 outline  outline-transparent hover:outline-white/10 transition text-[13px] font-medium",
                  isActive && "bg-white/5 text-neutral-100 outline-white/10"
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            </div>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="mt-auto p-4 border-t border-white/10">
        <div className="flex items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop"
            alt="Alex Morgan"
            className="h-9 w-9 rounded-full ring-1 ring-white/10 object-cover"
          />
          <div className="text-[13px]">
            <div className="font-medium text-neutral-100 tracking-tight">Alex Morgan</div>
            <div className="text-neutral-400 text-xs">alex.morgan@example.com</div>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <a className="flex-1 text-xs px-3 py-2 rounded-md bg-white/5 hover:bg-white/10 outline outline-white/10" href="/user-profile">
            Account
          </a>
          <button className="px-3 py-2 rounded-md bg-white/5 hover:bg-white/10 outline  outline-white/10">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
