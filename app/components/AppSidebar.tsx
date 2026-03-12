"use client";

import { ArrowLeftRight, Droplets, Plus, Wallet } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { to: "/", label: "Swap", icon: ArrowLeftRight },
  { to: "/create-pool", label: "Create Pool", icon: Plus },
  { to: "/pools", label: "Pools", icon: Droplets },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-neutral-950 border-r border-neutral-800 flex flex-col z-50">
      <div className="px-6 py-6 border-b border-neutral-800">
        <h1 className="text-xl font-semibold flex items-center gap-3 tracking-tight">
          <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600">
            <Droplets className="w-5 h-5 text-white" />
          </div>
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            AMM_DEX
          </span>
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.to;
          const Icon = item.icon;

          return (
            <Link
              key={item.to}
              href={item.to}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-[0_0_10px_rgba(99,102,241,0.15)]"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-900"
              }`}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Wallet */}
      <div className="p-4 border-t border-neutral-800">
        <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:opacity-90 transition">
          <Wallet className="w-4 h-4" />
          Connect Wallet
        </button>
      </div>
    </aside>
  );
}
