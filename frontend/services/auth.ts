import { api } from "./api";
import { parseCookies } from "nookies";
import { GetServerSideProps } from "next";

export const getToken = () => {
  if (typeof window !== "undefined") {
    const tokenStg = localStorage.getItem("user");
    if (!tokenStg) {
      return null;
    }
    const token = JSON.parse(tokenStg);
    return token ?? null;
  }
};

export const setToken = (value: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("user", JSON.stringify(value));
  }
};

export const loginRequest = async (name: string, password: string) => {
  let data = { name, password };
  try {
    const request = await api.post("/login", data);
    return request.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getProtected = async (ctx: any, cb: any, role = "user") => {
  const cookies = parseCookies(ctx);
  let user;
  if (cookies.user) {
    user = JSON.parse(cookies.user);
  }
  if (!user.token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  if (role === "admin" && !user.admin) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return cb();
};