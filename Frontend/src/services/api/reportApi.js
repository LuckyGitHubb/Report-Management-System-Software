import baseApi from "./baseApi";

export const fetchAllUsers = () => {
  return baseApi.get(`/user/all`);
};

export const fetchUsertById = (id) => {
  return baseApi.get(`/user/${id}`);
};
