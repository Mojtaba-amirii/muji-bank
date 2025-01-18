"use client";

import { FormEvent, useState, useTransition, ChangeEvent } from "react";
import { AlertCircle, CheckCircle, Eye, EyeOff } from "lucide-react";

import { registerUser } from "../utils/apiService";
import { User } from "../types/types";

export default function Register() {
  const [formData, setFormData] = useState<Omit<User, "id">>({
    username: "",
    password: "",
    amount: undefined,
  });
  const [registrationStatus, setRegistrationStatus] = useState<
    "success" | "error" | ""
  >("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? (value ? Number(value) : undefined) : value,
    }));
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRegistrationStatus("");
    startTransition(async () => {
      try {
        await registerUser(formData);
        setRegistrationStatus("success");
        setFormData({ username: "", password: "", amount: undefined });
      } catch (err) {
        console.error("Error during registration:", err);
        setRegistrationStatus("error");
      }
    });
    setTimeout(() => setRegistrationStatus(""), 5000);
  };

  return (
    <section className=" h-fit bg-gradient-to-b from-purple-700 to-purple-900 flex items-center justify-center p-4 sm:p-6 lg:p-10 rounded-md">
      <div className="max-w-md w-full space-y-8">
        <h2 className="text-center text-3xl font-extrabold text-white">
          Create your Muji Bank account
        </h2>
        <p className="mt-2 text-center text-sm text-purple-200">
          Join us for secure and easy banking
        </p>

        <form onSubmit={handleRegister} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="reg-username" className="sr-only">
                Username
              </label>
              <input
                id="reg-username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-purple-300 placeholder-purple-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>
            <div className="relative">
              <label htmlFor="reg-password" className="sr-only">
                Password
              </label>
              <input
                id="reg-password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-purple-300 placeholder-purple-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-purple-500" />
                ) : (
                  <Eye className="h-5 w-5 text-purple-500" />
                )}
              </button>
            </div>
            <div>
              <label htmlFor="reg-amount" className="sr-only">
                Initial Deposit Amount
              </label>
              <input
                id="reg-amount"
                name="amount"
                type="number"
                autoComplete="off"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-purple-300 placeholder-purple-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                placeholder="Initial Deposit Amount"
                value={formData.amount || ""}
                onChange={handleInputChange}
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isPending}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              {isPending ? "Creating Account..." : "Create Account"}
            </button>
          </div>
        </form>

        <div className="mt-6">
          {registrationStatus === "success" && (
            <div className="rounded-md bg-green-50 p-4" role="alert">
              <div className="flex">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">
                    Registration successful! You can now log in.
                  </p>
                </div>
              </div>
            </div>
          )}
          {registrationStatus === "error" && (
            <div className="rounded-md bg-red-50 p-4" role="alert">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800">
                    Registration failed. Please try again.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
