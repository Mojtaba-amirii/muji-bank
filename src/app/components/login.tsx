"use client";

import { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [myToken, setMyToken] = useState(null);

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const user = { username, password };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/sessions`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      if (data && data.token) {
        setIsLoggedIn(true);
        setMyToken(data.token);
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.error("Error during login", error);
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGetAccount = async () => {
    setLoading(true);
    setError("");
    try {
      if (!isLoggedIn) {
        throw new Error("User is not logged in");
      }
      if (!myToken) {
        throw new Error("Token not available");
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/me/accounts`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + myToken,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setAmount(data.amount);
    } catch (error) {
      console.error("Error during get account", error);
      setError("Failed to retrieve account information.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="w-1/2 mx-auto flex flex-col gap-2">
      <h2 className="text-2xl text-center">Login into your Bank account</h2>
      <label>Your username </label>
      <input
        title="Log in"
        type="text"
        placeholder="Your username"
        autoComplete="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="p-1 rounded-sm"
        required
      />
      <label>Your password</label>
      <input
        title="login password"
        type="password"
        placeholder="Your password"
        autoComplete="off"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-1 rounded-sm"
        required
      />
      <button
        title="login button"
        type="button"
        onClick={handleLogin}
        disabled={loading}
        className="bg-blue-500 p-1 mt-2"
      >
        {loading ? "Logging In..." : "Log In"}
      </button>
      {isLoggedIn && (
        <span className=" text-green-500">{`Welcome ${username}!`}</span>
      )}
      <section className="flex flex-col gap-y-2 mt-4">
        <h2>Your Credit</h2>
        <button
          title="Credit check button"
          type="button"
          onClick={handleGetAccount}
          disabled={loading}
          className="p-1 w-full bg-blue-500"
        >
          {loading ? "Checking..." : "Check"}
        </button>
        <span className="text-green-600">{amount}</span>
        {error && <span className="text-red-500">{error}</span>}
      </section>
    </form>
  );
}

export default Login;
