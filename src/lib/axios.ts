// api.js
import axios from "axios";
import { getSession } from "next-auth/react";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}

const api = axios.create({
  baseURL: "http://127.0.0.1/api-tarjetas-didacticas/public/api",
  withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  const session = await getSession();

  if (session && session.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  } else {
    console.log("No session found or no accessToken.");
  }
  return config;
});

export default api;