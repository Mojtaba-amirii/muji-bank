"use client";

import { FormEvent, useState, useCallback } from "react";
import { registerUser } from "../utils/apiService";
import { User } from "../types/types";

export default function Register() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [registrationStatus, setRegistrationStatus] = useState<
    "success" | "error" | ""
  >("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRegister = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);
      setRegistrationStatus("");
      try {
        const user: User = {
          username,
          password,
          amount: amount ? Number(amount) : undefined,
        };
        await registerUser(user);
        setRegistrationStatus("success");
        setUsername("");
        setPassword("");
        setAmount("");
      } catch (err) {
        console.error("Error during registration:", err);
        setRegistrationStatus("error");
      } finally {
        setIsLoading(false);
        setTimeout(() => setRegistrationStatus(""), 3000);
      }
    },
    [username, password, amount]
  );

  return (
    <form
      onSubmit={handleRegister}
      aria-label="Register user form"
      className="w-full max-w-2xl flex flex-col gap-3 shadow-md p-6 rounded-md mb-8"
    >
      <h2 className="text-2xl text-center font-semibold mb-2">
        Create your bank account here
      </h2>
      <label
        htmlFor="reg-username"
        className=" block text-base font-medium text-neutral-700"
      >
        Choose Username
      </label>
      <input
        id="reg-username"
        title="username"
        name="username"
        type="text"
        placeholder="Enter username"
        autoComplete="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        aria-required="true"
        className="block w-full p-2 border border-neutral-300 rounded-md shadow-sm"
      />
      <label
        htmlFor="reg-password"
        className=" block text-base font-medium text-neutral-700"
      >
        Choose Password
      </label>
      <input
        id="reg-password"
        name="password"
        title="password"
        type="password"
        placeholder="Enter a strong password"
        autoComplete="new-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        aria-required="true"
        className="block w-full p-2 border border-neutral-300 rounded-md shadow-sm"
      />
      <label
        htmlFor="reg-amount"
        className=" block text-base font-medium text-neutral-700"
      >
        Put any Amount
      </label>
      <input
        id="reg-amount"
        title="amount"
        name="amount"
        type="number"
        placeholder="Insert the amount"
        autoComplete="off"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="block w-full p-2 border border-neutral-300 rounded-md shadow-sm"
        required
        aria-required="true"
        min="0"
        step="0.01"
      />
      <button
        title="Register account button"
        type="submit"
        disabled={isLoading}
        className="w-1/2 mx-auto text-white bg-blue-400 p-2 mt-2 rounded-md shadow-sm hover:bg-blue-500"
      >
        {isLoading ? "Registering..." : "Register"}
      </button>
      <div aria-live="polite">
        {registrationStatus === "success" && (
          <p className="text-green-600">Registration successful!</p>
        )}
        {registrationStatus === "error" && (
          <p className="text-red-500">Registration failed. Please try again.</p>
        )}
      </div>
    </form>
  );
}
