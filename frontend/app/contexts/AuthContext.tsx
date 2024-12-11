// app/contexts/AuthContext.tsx
"use client";
import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import config from "../config/config";

interface UserData {
  name: "";
  id: number;
  email: "";
  role: "admin" | "user" | "";
}
interface AuthContextType {
  authState: {
    isAuthenticated: boolean;
    user: UserData | null;
    loading: boolean;
  };
  login: (userData: UserData | null, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode; // Explicitly typing children
}
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthContextType["authState"]>({
    isAuthenticated: false,
    user: null, // User data
    loading: true, // To handle the initial loading state
  });

  // Fetch user data from API or local storage on initial render
  const initializeUser = async () => {
    try {
      const token = localStorage.getItem("userToken");
      if (token) {
        const response = await fetch(`${config.apiBaseUrl}/api/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setAuthState({
            isAuthenticated: true,
            user: userData,
            loading: false,
          });
        } else {
          setAuthState({
            isAuthenticated: false,
            user: null,
            loading: false,
          });
        }
      } else {
        setAuthState({
          isAuthenticated: false,
          user: null,
          loading: false,
        });
      }
    } catch (error) {
      console.error("Failed to initialize user:", error);
      setAuthState({
        isAuthenticated: false,
        user: null,
        loading: false,
      });
    }
  };

  useEffect(() => {
    initializeUser();
  }, []);

  const login = (userData: UserData | null, token: string) => {
    localStorage.setItem("userToken", token);
    setAuthState({
      isAuthenticated: !!userData, // Ensure boolean value
      user: userData, // Accepts UserData or null
      loading: false,
    });
  };

  const logout = () => {
    localStorage.removeItem("userToken");
    setAuthState({
      isAuthenticated: false,
      user: null,
      loading: false,
    });
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
