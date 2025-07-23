import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import {
  getCurrentUser,
  login as loginApi,
  logout as logoutApi,
  register as registerApi,
} from "../services/Auth";

interface User {
  id: number;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const { user } = await getCurrentUser();
        setUser(user);
      } catch (err) {
        // If there's an error, we assume the user is not logged in
        console.log("No authenticated user found");
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await loginApi(email, password);
      setUser(response.user);
    } catch (err: any) {
      setError(err.response?.data?.error || "Login failed. Please try again.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      setLoading(true);
      setError(null);
      const response = await registerApi(username, email, password);
      setUser(response.user);
    } catch (err: any) {
      setError(
        err.response?.data?.error || "Registration failed. Please try again."
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await logoutApi();
      setUser(null);
    } catch (err: any) {
      setError(err.response?.data?.error || "Logout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, error, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default useAuth;
