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
    <header className="shadow-md bg-conic-180 from-purple-500 via-purple-600 to-purple-700 sticky top-0 z-10 ">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link
            href="/"
            className="text-2xl font-bold text-purple-950 p-1 hover:text-white"
          >
            Muji Bank
          </Link>
          <nav className="hidden md:flex space-x-6">
            {navItems.map(({ href, label, icon: Icon, onClick }) => (
              <Link
                key={label}
                href={href || "#"}
                onClick={onClick}
                className="flex items-center text-purple-950 hover:text-white p-1"
              >
                {label}
                <Icon className="ml-1 h-5 w-5" />
              </Link>
            ))}
          </nav>
          <button
            type="button"
            title="menu button"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <nav className="md:hidden flex flex-col space-y-2 px-4 py-2">
          {navItems.map(({ href, label, icon: Icon, onClick }) => (
            <Link
              key={label}
              href={href || "#"}
              onClick={onClick}
              className="flex items-center text-purple-950 hover:text-white"
            >
              <Icon className="mr-2 h-5 w-5" />
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
