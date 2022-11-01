import { useRouter } from "next/router";
import React, { createContext, useState, useEffect, useContext } from "react";
import { loginRequest, getToken, setToken } from "../services/auth";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { api } from "../services/api";

interface Props {
  children: React.ReactNode;
}

interface AuthContextInterface {
  isLogged: boolean;
  user: any;
  login: (email: string, password: string) => Promise<number>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextInterface>({} as AuthContextInterface);

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const route = useRouter();

  const login = async (email: string, password: string): Promise<number> => {
    const data = await loginRequest(email, password);
    if (data) {
      setCookie(undefined, "user", JSON.stringify(data.data), {maxAge: 60*60*24}) //24horas
      setIsLogged(true);
    }
    return data.id;
  };

  const logout = () => {
    destroyCookie(undefined, "user")
    setIsLogged(false);
  };;

  useEffect(() => {
    const cookie = parseCookies()
    let user;
    if (cookie.user) {
      user = JSON.parse(cookie.user);
    }
    if (cookie.user) {
      setUser(user);
      setIsLogged(true);
    }
  }, [isLogged]);

  return (
    <AuthContext.Provider value={{ isLogged, login, logout, user}}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
