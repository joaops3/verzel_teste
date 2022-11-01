import axios from "axios";
import { getToken } from "./auth";
import { parseCookies } from "nookies";

//axios.post(url, body, method, header)

export const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_BASE_URL });

const header = {
  "Content-Type": "application/json",
  Authorization: "",
};
const parameters = {
  method: "GET",
  headers: header,
};

api.interceptors.request.use(
  (config: any) => {
      const cookie = parseCookies();
      let user;
      if (cookie.user) {
        user = JSON.parse(cookie.user);
      }
    if (!user) {
      return config;
    }
    console.log("dsds",user)
    if (config.headers) {
      config.headers.Authorization = `Bearer ${user.token}`;
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);
