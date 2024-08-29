"use client";

import { ChangeEvent, useCallback, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getAccount } from "../utils/apiService";
import { User } from "../types/types";

function Login() {
  const [formState, setFormState] = useState<
    Pick<User, "username" | "password">
  >({
    username: "",
    password: "",
  });
  const [amount, setAmount] = useState<number | null>(null);
  const [loginLoading, setLoginLoading] = useState<boolean>(false);
  const [checkingLoading, setCheckingLoading] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);
  const { isLoggedIn, login, token, logout } = useAuth();

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { id, value } = e.target;
      setFormState((prev) => ({
        ...prev,
        [id]: value,
      }));
      if (error) setError(null);
    },
    [error]
  );

  const handleLogin = useCallback(async () => {
    setLoginLoading(true);
    setError(null);
    try {
      await login(formState);
    } catch (error) {
      console.error("Error during login", error);
      setError("Login failed. Please try again.");
    } finally {
      setLoginLoading(false);
    }
  }, [formState, login]);

  const handleGetAccount = useCallback(async () => {
    if (!token) {
      setError("You must be logged in to check account information.");
      return;
    }
    setCheckingLoading(true);
    setError(null);
    try {
      const accountData = await getAccount(token as string);
      setAmount(accountData.amount);
    } catch (error) {
      console.error("Error during get account", error);
      setError("Failed to retrieve account information.");
    } finally {
      setCheckingLoading(false);
    }
  }, [token]);

  return (
    <form className="w-full max-w-2xl flex flex-col gap-3 shadow-md p-6 rounded-md mb-8">
      <h2 className="text-2xl text-center font-semibold mb-2">
        Login into your Bank account
      </h2>
      <label
        htmlFor="username"
        className=" block text-base font-medium text-neutral-700"
      >
        Your username{" "}
      </label>
      <input
        id="username"
        title="Log in"
        type="text"
        placeholder="Your username"
        autoComplete="username"
        value={formState.username}
        onChange={handleInputChange}
        required
        className="block w-full p-2 border border-neutral-300 rounded-md shadow-sm"
      />
      <label
        htmlFor="password"
        className=" block text-base font-medium text-neutral-700"
      >
        Your password
      </label>
      <input
        id="password"
        title="login password"
        type="password"
        placeholder="Your password"
        autoComplete="off"
        value={formState.password}
        onChange={handleInputChange}
        required
        className="block w-full p-2 border border-neutral-300 rounded-md shadow-sm"
      />
      <button
        title="login button"
        type="button"
        onClick={handleLogin}
        disabled={loginLoading}
        className="w-1/2 mx-auto text-white bg-blue-400 p-2 mt-2 rounded-md shadow-sm hover:bg-blue-500"
      >
        {loginLoading ? "Logging In..." : "Log In"}
      </button>
      {isLoggedIn && (
        <>
          <span className=" text-green-600">{`Welcome ${formState.username}!`}</span>
          <button
            title="logout button"
            type="button"
            onClick={logout}
            className="w-1/2 mx-auto bg-red-400 text-white p-2 mt-2 rounded-md shadow-sm hover:bg-red-500"
          >
            Log Out
          </button>
          <section className="flex flex-col gap-y-2 mt-4">
            <h2>Your Credit</h2>
            <button
              title="Credit check button"
              type="button"
              onClick={handleGetAccount}
              disabled={checkingLoading}
              className="w-1/2 mx-auto bg-blue-400 text-white p-2 rounded-md shadow-sm hover:bg-blue-500 "
            >
              {checkingLoading ? "Checking..." : "Check"}
            </button>
            <span className="text-green-600">{amount !== null && amount}</span>
          </section>
        </>
      )}
      {error && <span className="text-red-500">{error}</span>}
    </form>
  );
}

export default Login;
