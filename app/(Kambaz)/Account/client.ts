import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });

// ✅ Minimal fix: default + trim trailing slash
export const HTTP_SERVER = (process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000").replace(/\/$/, "");
export const USERS_API = `${HTTP_SERVER}/api/users`;

export const signin = async (credentials: any) => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signin`, credentials);
  return response.data;
};
export const profile = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/profile`);
  return response.data;
};
export const signup = async (user: any) => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signup`, user);
  return response.data;
};
export const updateUser = async (user: any) => {
  const response = await axiosWithCredentials.put(`${USERS_API}/${user._id}`, user);
  return response.data;
};
export const signout = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signout`);
  return response.data;
};
export const createUser = async (user: any) => {
  const { data } = await axiosWithCredentials.post(`${USERS_API}`, user);
  return data; 
};
export const findAllUsers = async () => {
  const { data } = await axiosWithCredentials.get(`${USERS_API}`);
  return data; 
};
export const findUserById = async (userId: string) => {
  const { data } = await axiosWithCredentials.get(`${USERS_API}/${userId}`);
  return data; 
};
export const updateUserById = async (userId: string, updates: any) => {
  const { data } = await axiosWithCredentials.put(`${USERS_API}/${userId}`, updates);
  return data; 
};
export const deleteUser = async (userId: string) => {
  const { data } = await axiosWithCredentials.delete(`${USERS_API}/${userId}`);
  return data; 
};
