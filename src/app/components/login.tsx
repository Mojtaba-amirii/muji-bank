"use client";

import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getAccount } from "../utils/apiService";
import { User } from "../types/types";

function Login() {
  const [loginCredentials, setLoginCredentials] = useState<
    Pick<User, "username" | "password">
  >({
    username: "",
    password: "",
  });
  const [accountBalance, setAccountBalance] = useState<number | null>(null);
  const [loginLoading, setLoginLoading] = useState<boolean>(false);
  const [checkingLoading, setCheckingLoading] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const { isLoggedIn, login, token, logout } = useAuth();

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

  const handleLogin = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoginLoading(true);
      setLoginError(null);
      try {
        await login(loginCredentials);
      } catch (error) {
        console.error("Error during login", error);
        setLoginError("Login failed. Please try again.");
      } finally {
        setLoginLoading(false);
      }
    },
    [loginCredentials, login]
  );

  const handleGetAccount = useCallback(async () => {
    if (!token) {
      setLoginError("You must be logged in to check account information.");
      return;
    }
    setCheckingLoading(true);
    setLoginError(null);
    try {
      const accountData = await getAccount(token as string);
      setAccountBalance(accountData.amount);
    } catch (error) {
      console.error("Error during get account", error);
      setLoginError("Failed to retrieve account information.");
    } finally {
      setCheckingLoading(false);
    }
  }, [token]);

  const handleLogout = useCallback(() => {
    logout();
    setLoginCredentials({ username: "", password: "" });
    setAccountBalance(null);
  }, [logout]);

  return (
    <form
      onSubmit={handleLogin}
      aria-label="Login from"
      className="w-full max-w-2xl flex flex-col gap-3 shadow-md p-6 rounded-md mb-8"
    >
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
        name="username"
        title="Log in"
        type="text"
        placeholder="Your username"
        autoComplete="username"
        value={loginCredentials.username}
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
        name="password"
        title="login password"
        type="password"
        placeholder="Your password"
        autoComplete="off"
        value={loginCredentials.password}
        onChange={handleInputChange}
        required
        className="block w-full p-2 border border-neutral-300 rounded-md shadow-sm"
      />
      <button
        title="login button"
        type="submit"
        disabled={loginLoading}
        className="w-1/2 mx-auto text-white bg-blue-400 p-2 mt-2 rounded-md shadow-sm hover:bg-blue-500"
      >
        {loginLoading ? "Logging In..." : "Log In"}
      </button>
      {isLoggedIn && (
        <>
          <span className=" text-green-600">{`Welcome ${loginCredentials.username}!`}</span>
          <button
            title="logout button"
            type="button"
            onClick={handleLogout}
            className="w-1/2 mx-auto bg-red-400 text-white p-2 mt-2 rounded-md shadow-sm hover:bg-red-500"
          >
            Log Out
          </button>
          <div className="flex flex-col gap-y-2 mt-4">
            <h3 className=" text-lg font-semibold text-center">
              Your Account Balance
            </h3>
            <button
              title="Check Balance button"
              type="button"
              onClick={handleGetAccount}
              disabled={checkingLoading}
              className="w-1/2 mx-auto bg-blue-400 text-white p-2 rounded-md shadow-sm hover:bg-blue-500 "
            >
              {checkingLoading ? "Checking..." : "Check"}
            </button>
            <p className="text-green-600 ">{`Your balance: ${
              accountBalance === null ? "Click to check" : accountBalance
            }`}</p>
          </div>
        </>
      )}
      {loginError && <span className="text-red-500">{loginError}</span>}
    </form>
  );
}

export default Login;
