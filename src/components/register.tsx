"use client";

import { AlertCircle, CheckCircle, Eye, EyeOff } from "lucide-react";
import { FormEvent, useState, useTransition, ChangeEvent } from "react";

import { User } from "../types/types";
import { registerUser } from "../utils/apiService";

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
    <section className="w-fit mx-auto px-4">
      <div className="glass-effect rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-success-500 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <span className="text-white font-black text-lg sm:text-2xl">+</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Join Muji Bank
          </h2>
          <p className="text-white/80 text-sm">
            Create your account for secure and easy banking
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5 sm:space-y-6">
          {/* Username Input */}
          <div className="space-y-2">
            <label
              htmlFor="reg-username"
              className="text-sm font-medium text-white/90 block"
            >
              Username
            </label>
            <input
              id="reg-username"
              name="username"
              type="text"
              autoComplete="username"
              required
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-success-400 focus:border-success-400 transition-all duration-200 text-sm sm:text-base"
              placeholder="Choose a username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label
              htmlFor="reg-password"
              className="text-sm font-medium text-white/90 block"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="reg-password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-10 sm:pr-12 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-success-400 focus:border-success-400 transition-all duration-200 text-sm sm:text-base"
                placeholder="Create a secure password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center text-white/60 hover:text-white transition-colors"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
                ) : (
                  <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Initial Deposit Input */}
          <div className="space-y-2">
            <label
              htmlFor="reg-amount"
              className="text-sm font-medium text-white/90 block"
            >
              Initial Deposit
            </label>
            <div className="relative">
              <span className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-white/60 text-base sm:text-lg">
                $
              </span>
              <input
                id="reg-amount"
                name="amount"
                type="number"
                autoComplete="off"
                required
                className="w-full pl-7 sm:pl-8 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-success-400 focus:border-success-400 transition-all duration-200 text-sm sm:text-base"
                placeholder="0.00"
                value={formData.amount || ""}
                onChange={handleInputChange}
                min="0"
                step="0.01"
              />
            </div>
            <p className="text-xs text-white/60">
              Minimum deposit of $10 required
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-linear-to-r from-success-500 to-success-600 hover:from-success-400 hover:to-success-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2.5 sm:py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-success-400 focus:ring-offset-2 focus:ring-offset-transparent shadow-lg text-sm sm:text-base"
          >
            {isPending ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span className="text-sm sm:text-base">
                  Creating Account...
                </span>
              </span>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Status Messages */}
        {registrationStatus === "success" && (
          <div
            className="mt-5 sm:mt-6 bg-success-500/10 border border-success-500/20 rounded-xl p-3 sm:p-4"
            role="alert"
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-success-400 shrink-0" />
              <div>
                <p className="text-xs sm:text-sm font-medium text-success-100">
                  Account created successfully!
                </p>
                <p className="text-xs text-success-200 mt-1">
                  You can now sign in to your account.
                </p>
              </div>
            </div>
          </div>
        )}

        {registrationStatus === "error" && (
          <div
            className="mt-5 sm:mt-6 bg-error-500/10 border border-error-500/20 rounded-xl p-3 sm:p-4"
            role="alert"
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-error-400 shrink-0" />
              <p className="text-xs sm:text-sm font-medium text-error-100">
                Registration failed. Please try again.
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 sm:mt-8 text-center">
          <p className="text-white/60 text-xs sm:text-sm">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-success-400 hover:text-success-300 font-medium transition-colors"
            >
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
