"use client";

import { useEffect, useState, useCallback } from "react";
import {
  RefreshCw,
  LogOut,
  CreditCard,
  User as UserIcon,
  Settings,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { useAuth } from "../../context/AuthContext";
import { getAccount } from "../../utils/apiService";

export default function Profile() {
  const [accountBalance, setAccountBalance] = useState<number | null>(null);
  const [checkingLoading, setCheckingLoading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isLoggedIn, token, logout, user, refreshUserProfile } = useAuth();
  const router = useRouter();

  const fetchAccountBalance = useCallback(async () => {
    if (!token) {
      setError("You must be logged in to check account information.");
      return;
    }
    setCheckingLoading(true);
    setError(null);
    try {
      const accountData = await getAccount(token);
      setAccountBalance(accountData.amount);
    } catch (error) {
      console.error("Error fetching account balance", error);
      setError("Failed to retrieve account information.");
    } finally {
      setCheckingLoading(false);
    }
  }, [token]);

  useEffect(() => {
    async function loadProfile() {
      if (isLoggedIn && token) {
        if (!user) {
          await refreshUserProfile();
        }
        await fetchAccountBalance();
      } else {
        router.push("/login");
      }
      setIsLoading(false);
    }
    loadProfile();
  }, [
    isLoggedIn,
    token,
    user,
    refreshUserProfile,
    fetchAccountBalance,
    router,
  ]);

  const handleLogout = useCallback(() => {
    logout();
    router.push("/");
  }, [logout, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!isLoggedIn || !user) {
    return null;
  }

  return (
    <section className=" h-fit bg-gradient-to-b from-purple-700 to-purple-900 py-12 p-4 sm:p-6 lg:p-10 rounded-md">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h1 className="text-3xl font-bold leading-6 text-gray-900">
              Profile
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Personal and account details
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <UserIcon className="mr-2 h-5 w-5 text-purple-500" />
                  Username
                </dt>
                <dd className="mt-1 text-base text-gray-900 sm:mt-0 sm:col-span-2">
                  {user?.username || "N/A"}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 items-center justify-center sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <CreditCard className="mr-2 h-5 w-5 text-purple-500" />
                  Account Balance
                </dt>
                <dd className="flex justify-between items-center mt-1 text-sm sm:mt-0 sm:col-span-2 text-green-500">
                  {accountBalance === null ? "---" : `$${accountBalance}`}
                  <button
                    type="button"
                    onClick={fetchAccountBalance}
                    disabled={checkingLoading}
                    className="ml-3 inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-purple-700 bg-purple-100 hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    {checkingLoading ? (
                      <RefreshCw className="animate-spin h-4 w-4" />
                    ) : (
                      <RefreshCw className="h-4 w-4" />
                    )}
                    <span className="ml-1">
                      {checkingLoading ? "Refreshing..." : "Refresh"}
                    </span>
                  </button>
                </dd>
              </div>
            </dl>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              type="button"
              onClick={() => {
                /* Implement settings functionality */
              }}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mr-3"
            >
              <Settings className="mr-2 h-5 w-5" />
              Settings
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <LogOut className="mr-2 h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
        {error && (
          <div className="mt-4 rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
