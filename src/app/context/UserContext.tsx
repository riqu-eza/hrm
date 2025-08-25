"use client";

import { createContext, useState, useContext, useEffect } from "react";
import {jwtDecode} from "jwt-decode";

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
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const decoded: any = jwtDecode(token);
        setUser({
          userId: decoded.userId,
          role: decoded.role,
          name: decoded.name,
          propertyId: decoded.propertyId,
        });
      } catch (err) {
        console.error("Invalid token", err);
        localStorage.removeItem("token");
      }
    }
    setLoading(false);
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token"); // ← was `user`, should be `token`
  };

  return (
    <UserContext.Provider value={{ user, loading, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext)!;
