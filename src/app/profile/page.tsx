"use client";

import { useEffect, useState, useCallback, useTransition } from "react";
import {
  RefreshCw,
  LogOut,
  CreditCard,
  User as UserIcon,
  Settings,
  AlertCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { useAuth } from "../../context/AuthContext";
import { getAccount } from "../../utils/apiService";

export default function Profile() {
  const [accountBalance, setAccountBalance] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const { isLoggedIn, token, logout, user, refreshUserProfile } = useAuth();
  const router = useRouter();

  const fetchAccountBalance = useCallback(() => {
    if (!token) {
      setError("You must be logged in to check account information.");
      return;
    }
    startTransition(async () => {
      setError(null);
      try {
        const accountData = await getAccount(token);
        setAccountBalance(accountData.amount);
      } catch (error) {
        console.error("Error fetching account balance", error);
        setError("Failed to retrieve account information.");
      }
    });
  }, [token]);

  useEffect(() => {
    async function loadProfile() {
      if (isLoggedIn && token) {
        startTransition(async () => {
          if (!user) {
            await refreshUserProfile();
          }
          fetchAccountBalance();
        });
      } else {
        router.push("/login");
      }
    }
    loadProfile();
  }, [
    isLoggedIn,
    token,
    user,
    refreshUserProfile,
    router,
    fetchAccountBalance,
  ]);

  const handleLogout = useCallback(() => {
    logout();
    router.push("/");
  }, [logout, router]);

  if (!isLoggedIn || !user) {
    return null;
  }

  return (
    <section className="w-full max-w-6xl mx-auto px-4">
      <div className="space-y-6 sm:space-y-8 lg:space-y-10">
        {/* Profile Header */}
        <div className="text-center space-y-3 sm:space-y-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-accent-500 rounded-3xl flex items-center justify-center mx-auto">
            <UserIcon className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-brand-900" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              Welcome back, {user?.username}
            </h1>
            <p className="text-white/80 text-sm sm:text-base lg:text-lg">
              Manage your account and view your financial overview
            </p>
          </div>
        </div>

        {/* Account Overview Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Balance Card */}
          <div className="glass-effect border border-white/20 rounded-3xl p-6 sm:p-8">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-success-500/20 rounded-2xl flex items-center justify-center">
                  <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-success-400" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-white">
                    Account Balance
                  </h3>
                  <p className="text-white/60 text-xs sm:text-sm">
                    Available funds
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={fetchAccountBalance}
                disabled={isPending}
                className="p-2 rounded-xl hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                aria-label="Refresh account balance"
              >
                <RefreshCw
                  className={`w-4 h-4 sm:w-5 sm:h-5 text-white/80 ${
                    isPending ? "animate-spin" : ""
                  }`}
                />
              </button>
            </div>

            <div className="space-y-2">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-success-400">
                {accountBalance === null
                  ? "---"
                  : `$${accountBalance.toLocaleString()}`}
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-white/60">
                <div className="w-2 h-2 bg-success-400 rounded-full"></div>
                <span>
                  Last updated: {isPending ? "Updating..." : "Just now"}
                </span>
              </div>
            </div>
          </div>

          {/* Account Details Card */}
          <div className="glass-effect border border-white/20 rounded-3xl p-6 sm:p-8">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-brand-400/20 rounded-2xl flex items-center justify-center">
                <UserIcon className="w-5 h-5 sm:w-6 sm:h-6 text-brand-300" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-white">
                  Account Details
                </h3>
                <p className="text-white/60 text-xs sm:text-sm">
                  Your profile information
                </p>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div className="flex justify-between items-center py-2 sm:py-3 border-b border-white/10">
                <span className="text-white/80 text-sm sm:text-base">
                  Username
                </span>
                <span className="text-white font-medium text-sm sm:text-base">
                  {user?.username || "N/A"}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 sm:py-3 border-b border-white/10">
                <span className="text-white/80 text-sm sm:text-base">
                  Account Type
                </span>
                <span className="text-accent-400 font-medium text-sm sm:text-base">
                  Personal
                </span>
              </div>
              <div className="flex justify-between items-center py-2 sm:py-3">
                <span className="text-white/80 text-sm sm:text-base">
                  Status
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success-400 rounded-full animate-pulse"></div>
                  <span className="text-success-400 font-medium text-sm sm:text-base">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <button
            type="button"
            onClick={() => {
              console.log("Settings clicked");
            }}
            className="group flex items-center justify-center gap-2 sm:gap-3 glass-effect border border-white/20 hover:bg-white/10 text-white py-3 sm:py-4 px-6 sm:px-8 rounded-2xl transition-all duration-200 transform hover:scale-105 text-sm sm:text-base"
          >
            <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-medium">Account Settings</span>
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="group flex items-center justify-center gap-2 sm:gap-3 bg-error-500/20 border border-error-500/30 hover:bg-error-500/30 text-error-100 py-3 sm:py-4 px-6 sm:px-8 rounded-2xl transition-all duration-200 transform hover:scale-105 text-sm sm:text-base"
          >
            <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div
            className="bg-error-500/10 border border-error-500/20 rounded-2xl p-4 sm:p-6"
            role="alert"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <AlertCircle className="h-5 w-5 sm:h-6 sm:w-6 text-error-400 shrink-0" />
              <div>
                <h4 className="font-medium text-error-100 text-sm sm:text-base">
                  Error
                </h4>
                <p className="text-xs sm:text-sm text-error-200 mt-1">
                  {error}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
