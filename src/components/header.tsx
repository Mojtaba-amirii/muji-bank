"use client";

import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { LogOut } from "lucide-react";

export default function Header() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold text-purple-950">
            Muji Bank
          </Link>
          <nav className="hidden md:flex space-x-4">
            <Link href="/" className="text-purple-950 hover:text-white">
              Home
            </Link>

            {user ? (
              <>
                <Link
                  href="/profile"
                  className="text-purple-950 hover:text-white"
                >
                  Profile
                </Link>
                <button
                  type="button"
                  onClick={logout}
                  className=" flex justify-center items-center text-purple-950 hover:text-white"
                >
                  Logout
                  <LogOut className="ml-1 h-5 w-5" />
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/create-account"
                  className="text-purple-950 hover:text-white"
                >
                  Create Account
                </Link>
                <Link
                  href="/login"
                  className="text-purple-950 hover:text-white"
                >
                  Login
                </Link>
              </>
            )}
          </nav>
          <button
            type="button"
            title="menu button"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="flex flex-col space-y-2 px-4 py-2">
            <Link href="/" className="text-gray-600 hover:text-blue-600">
              Home
            </Link>
            <Link
              href="/accounts"
              className="text-gray-600 hover:text-blue-600"
            >
              Accounts
            </Link>
            <Link
              href="/transfers"
              className="text-gray-600 hover:text-blue-600"
            >
              Transfers
            </Link>
            {user ? (
              <>
                <Link
                  href="/profile"
                  className="text-gray-600 hover:text-blue-600"
                >
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className="text-gray-600 hover:text-blue-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login" className="text-gray-600 hover:text-blue-600">
                Login
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
