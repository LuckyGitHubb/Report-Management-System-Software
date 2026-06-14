import baseApi from "./baseApi";

export const fetchAllUsers = () => {
  return baseApi.get(`/auth/users`);
};

export const fetchUsertById = (id) => {
  return baseApi.get(`/auth/user/${id}`);
};

export const getMe = () => {
  return baseApi.get(`/auth/me`);
};