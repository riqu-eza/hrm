"use client";

import { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

type User = {
  userId: string;
  role: string;
  name: string;
  propertyId?: string;
};

type UserContextType = {
  user: User | null;
  loading: boolean;
  logout: () => void;
  setUserFromToken: (token: string) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const decodeAndSetUser = (token: string) => {
    try {
      const decoded = jwtDecode<{
        userId: string;
        role: string;
        name: string;
      }>(token);
      setUser({
        userId: decoded.userId,
        role: decoded.role,
        name: decoded.name,
      });
    } catch (err) {
      console.error("Invalid token", err);
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  // Run on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) decodeAndSetUser(token);
    setLoading(false);

    // 👇 listen for token changes (e.g. from other tabs)
    const handleStorage = () => {
      const newToken = localStorage.getItem("token");
      if (newToken) {
        decodeAndSetUser(newToken);
      } else {
        setUser(null);
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider
      value={{ user, loading, logout, setUserFromToken: decodeAndSetUser }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used inside UserProvider");
  return ctx;
};
