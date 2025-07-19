import type { LoginResponse, User } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import { queryClient } from "./react-query-provider";
import { useLocation, useNavigate } from "react-router";
import { publicRoutes } from "@/lib";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginResponse) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const currentPath = useLocation().pathname;
  const navigate = useNavigate();
  const isPublicRoutes = publicRoutes.includes(currentPath);

  // Check user is login
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);

      const userData = localStorage.getItem("user");
      if (userData) {
        setIsAuthenticated(true);
        setUser(JSON.parse(userData));
      } else {
        setIsAuthenticated(false);
        if (!isPublicRoutes) {
          navigate("/sign-in");
        }
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  // force-logout - an event will dispatch when something wrong that configured in axios
  useEffect(() => {
    const handleLogout = () => {
      logout();
      navigate("/sign-in");
    };
    window.addEventListener("force-logout", handleLogout);
    return () => {
      window.removeEventListener("force-logout", handleLogout);
    };
  }, []);

  const login = async (data: LoginResponse) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    setUser(data.user);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setIsAuthenticated(false);
    queryClient.clear();
  };

  const values = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
