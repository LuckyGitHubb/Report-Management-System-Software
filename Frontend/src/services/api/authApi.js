import baseApi from "./baseApi";

export const authRegister = (form) => {
  return baseApi.post("/auth/register", { ...form });
};
export const authLogin = (form) => {
  return baseApi.post("/auth/login", { ...form });
};
export const authLogout = () => {
  return baseApi.post("/auth/logout");
};