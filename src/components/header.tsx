"use client";

import Link from "next/link";
import { useState } from "react";
import { LogOut, Menu, Home, UserPlus, User, LogIn } from "lucide-react";

import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    ...(user
      ? [
          { href: "/profile", label: "Profile", icon: User },
          { onClick: logout, label: "Logout", icon: LogOut },
        ]
      : [
          { href: "/create-account", label: "Create Account", icon: UserPlus },
          { href: "/login", label: "Login", icon: LogIn },
        ]),
  ];

  return (
    <header className="glass-effect border-b border-white/20 sticky top-0 z-50 backdrop-blur-xl">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
        <div className="flex justify-between items-center py-3 sm:py-4">
          <Link
            href="/"
            className="text-lg sm:text-xl lg:text-2xl font-bold text-white hover:text-accent-400 transition-colors duration-200 flex items-center gap-2"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-accent-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-brand-900 font-black text-xs sm:text-sm">
                MB
              </span>
            </div>
            <span className="hidden xs:inline">Muji Bank</span>
            <span className="xs:hidden">MB</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map(({ href, label, icon: Icon, onClick }) => (
              <Link
                key={label}
                href={href || "#"}
                onClick={onClick}
                className="flex items-center gap-2 text-white/90 hover:text-white hover:bg-white/10 px-3 lg:px-4 py-2 rounded-xl transition-all duration-200 font-medium text-sm lg:text-base"
              >
                <Icon className="h-4 w-4" />
                <span className="hidden lg:inline">{label}</span>
                <span className="lg:hidden">{label.split(" ")[0]}</span>
              </Link>
            ))}
          </nav>

          <button
            type="button"
            title="Toggle menu"
            className="md:hidden p-2 rounded-xl hover:bg-white/10 transition-colors duration-200 flex-shrink-0"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </button>
        </div>
      </div>

      {/* Mobile menu with improved animation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-white/20 bg-black/20 backdrop-blur-xl animate-in slide-in-from-top-2 duration-200">
          <nav className="container mx-auto px-3 sm:px-4 py-4 flex flex-col space-y-1">
            {navItems.map(({ href, label, icon: Icon, onClick }) => (
              <Link
                key={label}
                href={href || "#"}
                onClick={() => {
                  onClick?.();
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-3 text-white/90 hover:text-white hover:bg-white/10 px-4 py-3 rounded-xl transition-all duration-200 font-medium text-base"
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                <span>{label}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
