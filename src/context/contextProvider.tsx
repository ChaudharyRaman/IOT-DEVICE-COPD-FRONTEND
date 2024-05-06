import axios from "axios";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  FC,
} from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

interface User {
  id: string;
  name: string;
  email: string;
  company: string;
}

interface ContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  userToken: string | null;
  fetchAgain: boolean;
  setFetchAgain: (fetchAgain: boolean) => void;
}

const Context = createContext<ContextType | undefined>(undefined);

const ContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const userToken = localStorage.getItem("token");
  const [fetchAgain, setFetchAgain] = useState(false);

  useEffect(() => {
    if (!userToken) {
      navigate("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        };

        const { data } = await axios.get<User>(
          `http://localhost:3000/api/me`,
          config
        );
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user", error);
        setUser(null); // Or handle error more specifically
      }
    };

    fetchUser();
  }, [userToken, fetchAgain, navigate]);

  return (
    <Context.Provider
      value={{ user, setUser, userToken, fetchAgain, setFetchAgain }}
    >
      {children}
    </Context.Provider>
  );
};

export const useContextState = (): ContextType => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("useContextState must be used within a ContextProvider");
  }
  return context;
};

export default ContextProvider;
