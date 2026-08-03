"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type User = {
  id: string;
  fullName: string;
  email: string;
  profilePicture?: string;
  dob: string;
  position: string;
  company?: string;
};

type UserContextType = {
  user: User | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
};

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
  refreshUser: async () => {},
  logout: async () => {},
});

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        setUser(data.user || null);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, refreshUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
