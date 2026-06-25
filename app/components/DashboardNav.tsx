"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import SignoutConfirmModal from "./SignoutConfirmModal";
import FloatingChatbot from "./FloatingChatbot";
import { GraduationCap, LayoutDashboard, User as UserIcon, LogOut, Sparkles, ChevronDown } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function DashboardNav() {
  const { user, logout, isDemoMode } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [confirmSignoutOpen, setConfirmSignoutOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navLinks = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Profile", href: "/profile", icon: UserIcon },
  ];

  return (
    <>
      <header className="sticky top-0 z-[60] w-full border-b border-white/10 bg-surface/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6 lg:px-8">
          
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-90">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-primary-container via-secondary to-tertiary shadow-sm">
              <GraduationCap className="h-5 w-5 text-background-deep" strokeWidth={2.5} />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[1.1rem] font-bold text-on-surface tracking-tight">
                EduAgent
              </span>
              <span className="hidden sm:inline-flex rounded-full border border-primary/20 bg-primary/10 px-2 py-0.5 text-[0.65rem] font-semibold text-primary">
                Workspace
              </span>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="hidden sm:flex items-center gap-1.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-3.5 py-1.5 text-sm font-medium transition-all duration-200",
                    isActive 
                      ? "bg-primary/10 text-primary" 
                      : "text-on-surface-variant hover:bg-white/5 hover:text-on-surface"
                  )}
                >
                  <Icon className="h-4 w-4" strokeWidth={isActive ? 2.5 : 2} />
                  <span className="hidden sm:inline">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User + Actions */}
          <div className="flex items-center gap-4">
            {isDemoMode && (
              <span className="rounded-md border border-primary/20 bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                Demo Mode
              </span>
            )}

            {/* Desktop View: Separate Profile Avatar & Sign Out */}
            <div className="hidden sm:flex items-center gap-4">
              {/* Avatar + Name */}
              <div className="flex items-center gap-2.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={
                    user?.photoURL ||
                    `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(user?.displayName || "user")}`
                  }
                  alt="Profile"
                  className="h-8 w-8 rounded-full border border-primary/20 bg-white/5 object-cover"
                />
                <span className="text-sm font-semibold text-on-surface">
                  {user?.displayName?.split(" ")[0] || "Educator"}
                </span>
              </div>

              <div className="h-4 w-px bg-white/10" />

              {/* Sign Out */}
              <button
                onClick={() => setConfirmSignoutOpen(true)}
                className="flex items-center gap-2 rounded-md border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/20 hover:text-red-300"
              >
                <LogOut className="h-3.5 w-3.5" strokeWidth={2.5} />
                <span>Sign Out</span>
              </button>
            </div>

            {/* Mobile View: Profile Dropdown */}
            <div className="relative sm:hidden">
              <button 
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 p-1 pr-2 transition-colors hover:bg-white/10 focus:outline-none"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={
                    user?.photoURL ||
                    `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(user?.displayName || "user")}`
                  }
                  alt="Profile"
                  className="h-8 w-8 rounded-full border border-primary/20 bg-black/20 object-cover"
                />
                <ChevronDown className="h-4 w-4 text-on-surface-variant" />
              </button>

              {/* Dropdown Menu */}
              {profileDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setProfileDropdownOpen(false)} 
                  />
                  <div className="absolute right-0 top-[calc(100%+0.5rem)] w-48 overflow-hidden rounded-2xl border border-white/10 bg-surface/95 p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl z-50">
                    <Link
                      href="/profile"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
                    >
                      <UserIcon className="h-4 w-4 text-on-surface-variant" />
                      Profile
                    </Link>
                    <div className="my-1 h-px w-full bg-white/10" />
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        setConfirmSignoutOpen(true);
                      }}
                      className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/10"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <SignoutConfirmModal
        isOpen={confirmSignoutOpen}
        onClose={() => setConfirmSignoutOpen(false)}
        onConfirm={async () => {
          setConfirmSignoutOpen(false);
          await logout();
          router.push("/");
        }}
      />

      {/* Mobile Bottom Navigation */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface/90 border-t border-white/10 backdrop-blur-md flex justify-around items-center pb-safe">
        <Link
          href="/dashboard"
          className={cn(
            "flex flex-col items-center justify-center w-full py-3 text-xs font-medium transition-all duration-200",
            pathname === "/dashboard" 
              ? "text-primary" 
              : "text-on-surface-variant hover:text-on-surface"
          )}
        >
          <LayoutDashboard className={cn("h-5 w-5 mb-1", pathname === "/dashboard" ? "text-primary" : "")} strokeWidth={pathname === "/dashboard" ? 2.5 : 2} />
          <span>Dashboard</span>
        </Link>
        
        <button
          onClick={(e) => {
            e.preventDefault();
            window.dispatchEvent(new CustomEvent("toggle-chatbot"));
          }}
          className="ai-toggle-btn flex flex-col items-center justify-center w-full py-3 text-xs font-medium transition-all duration-200 text-on-surface-variant hover:text-on-surface"
        >
          <Sparkles className="h-5 w-5 mb-1" strokeWidth={2} />
          <span>AI</span>
        </button>
      </nav>

      <FloatingChatbot />
    </>
  );
}
