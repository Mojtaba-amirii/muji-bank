"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";

import { User } from "../types/types";
import { loginUser, getUserProfile } from "../utils/apiService";

interface AuthContextType {
  isLoggedIn: boolean;
  token: string | null;
  user: User | null;
  login: (credentials: Pick<User, "username" | "password">) => Promise<void>;
  logout: () => void;
  refreshUserProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (typeof window !== "undefined") {
      return !!localStorage.getItem("token");
    }
    return false;
  });
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  });
  const [user, setUser] = useState<User | null>(null);

  const logout = useCallback(() => {
    setToken(null);
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("token");
  }, []);

  const fetchUserProfile = useCallback(
    async (token: string) => {
      try {
        const userProfile = await getUserProfile(token);
        setUser(userProfile);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        logout();
      }
    },
    [logout]
  );

  const login = useCallback(
    async ({ username, password }: Pick<User, "username" | "password">) => {
      try {
        const { token } = await loginUser({ username, password });
        setToken(token);
        setIsLoggedIn(true);
        localStorage.setItem("token", token);
        await fetchUserProfile(token);
      } catch (error) {
        console.error("Login failed:", error);
        throw error;
      }
    },
    [fetchUserProfile]
  );

  const refreshUserProfile = useCallback(async () => {
    if (token) {
      await fetchUserProfile(token);
    }
  }, [token, fetchUserProfile]);

  // Fetch user profile on mount if token exists
  useEffect(() => {
    if (token) {
      // Use a separate async function to avoid setState sync call warning
      const loadUserProfile = async () => {
        await fetchUserProfile(token);
      };
      loadUserProfile();
    }
  }, [token, fetchUserProfile]);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, token, user, login, logout, refreshUserProfile }}
    >
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
