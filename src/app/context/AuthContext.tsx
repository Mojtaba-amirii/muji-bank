"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import { loginUser } from "../utils/apiService";
import { User } from "../types/types";

interface AuthContextType {
  isLoggedIn: boolean;
  token: string | null;
  login: (credentials: Pick<User, "username" | "password">) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true);
    }
  }, []);

  const login = useCallback(
    async ({ username, password }: Pick<User, "username" | "password">) => {
      try {
        const { token } = await loginUser({ username, password });
        setToken(token);
        setIsLoggedIn(true);
        localStorage.setItem("token", token);
      } catch (error) {
        console.error("Login failed:", error);
        throw error;
      }
    },
    []
  );

  const logout = useCallback(() => {
    setToken(null);
    setIsLoggedIn(false);
    localStorage.removeItem("token");
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
