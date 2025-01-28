"use client";

import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useState,
  useTransition,
} from "react";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

import { useAuth } from "../context/AuthContext";
import { User } from "../types/types";

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
    <section className=" h-fit bg-linear-to-b from-purple-700 to-purple-900 flex items-center justify-center p-4 sm:p-6 lg:p-24 rounded-md">
      <div className="max-w-md w-full space-y-8">
        <h2 className="text-center text-3xl font-extrabold text-white">
          Log in to your account
        </h2>

        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          <div className="rounded-md shadow-xs -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-purple-300 placeholder-purple-500 text-gray-900 rounded-t-md focus:outline-hidden focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                value={loginCredentials.username}
                onChange={handleInputChange}
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-purple-300 placeholder-purple-500 text-gray-900 rounded-b-md focus:outline-hidden focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={loginCredentials.password}
                onChange={handleInputChange}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-purple-500" />
                ) : (
                  <Eye className="h-5 w-5 text-purple-500" />
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            {isPending ? "Logging In..." : "Log In"}
          </button>
        </form>

        {loginError && (
          <div className="rounded-md bg-red-50 p-4 mt-4" role="alert">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <p className="text-sm font-medium text-red-800 ml-3">
                {loginError}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Login;
