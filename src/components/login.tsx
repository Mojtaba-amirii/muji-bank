"use client";

import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useState,
  useTransition,
} from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Eye, EyeOff } from "lucide-react";

import { User } from "../types/types";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [loginCredentials, setLoginCredentials] = useState<
    Pick<User, "username" | "password">
  >({
    username: "",
    password: "",
  });
  const [isPending, startTransition] = useTransition();
  const [loginError, setLoginError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { id, value } = e.target;
      setLoginCredentials((prev) => ({
        ...prev,
        [id]: value,
      }));
      if (loginError) setLoginError(null);
    },
    [loginError]
  );

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoginError(null);
    startTransition(async () => {
      try {
        await login(loginCredentials);
        router.push("/profile");
      } catch (error) {
        console.error("Error during login", error);
        setLoginError("Login failed. Please try again.");
      }
    });
  };

  return (
    <section className="w-fit mx-auto px-4">
      <div className="  glass-effect rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <span className="text-brand-900 font-black text-lg sm:text-2xl">
              MB
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Welcome Back
          </h2>
          <p className="text-white/80 text-sm">
            Sign in to access your account
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5 sm:space-y-6">
          {/* Username Input */}
          <div className="space-y-2">
            <label
              htmlFor="username"
              className="text-sm font-medium text-white/90 block"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-accent-400 transition-all duration-200 text-sm sm:text-base"
              placeholder="Enter your username"
              value={loginCredentials.username}
              onChange={handleInputChange}
            />
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-white/90 block"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-10 sm:pr-12 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-accent-400 transition-all duration-200 text-sm sm:text-base"
                placeholder="Enter your password"
                value={loginCredentials.password}
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-accent-500 hover:bg-accent-400 disabled:opacity-50 disabled:cursor-not-allowed text-brand-900 font-semibold py-2.5 sm:py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-offset-2 focus:ring-offset-transparent text-sm sm:text-base"
          >
            {isPending ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-brand-900/30 border-t-brand-900 rounded-full animate-spin"></div>
                <span className="text-sm sm:text-base">Signing In...</span>
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Error Message */}
        {loginError && (
          <div
            className="mt-5 sm:mt-6 bg-error-500/10 border border-error-500/20 rounded-xl p-3 sm:p-4"
            role="alert"
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-error-400 flex-shrink-0" />
              <p className="text-xs sm:text-sm font-medium text-error-100">
                {loginError}
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 sm:mt-8 text-center">
          <p className="text-white/60 text-xs sm:text-sm">
            Don&apos;t have an account?{" "}
            <a
              href="/create-account"
              className="text-accent-400 hover:text-accent-300 font-medium transition-colors"
            >
              Create one here
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;
