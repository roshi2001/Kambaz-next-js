import axios from "axios";

const HTTP_SERVER =
  process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";

const axiosWithCredentials = axios.create({
  baseURL: HTTP_SERVER,  
  withCredentials: true
});


export const USERS_API = `/api/users`;

export const signin = async (credentials: any) => {
  const { data } = await axiosWithCredentials.post(`${USERS_API}/signin`, credentials);
  return data;
};

export const profile = async () => {
  const { data } = await axiosWithCredentials.get(`${USERS_API}/profile`);
  return data;
};

export const signup = async (user: any) => {
  const { data } = await axiosWithCredentials.post(`${USERS_API}/signup`, user);
  return data;
};

export const updateUser = async (user: any) => {
  const { data } = await axiosWithCredentials.put(`${USERS_API}/${user._id}`, user);
  return data;
};

export const signout = async () => {
  const { data } = await axiosWithCredentials.post(`${USERS_API}/signout`);
  return data;
};

export const createUser = async (user: any) => {
  const { data } = await axiosWithCredentials.post(`${USERS_API}`, user);
  return data;
};

export const findAllUsers = async () => {
  const { data } = await axiosWithCredentials.get(USERS_API);
  return data;
};

export const findUserById = async (id: string) => {
  const { data } = await axiosWithCredentials.get(`${USERS_API}/${id}`);
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

export const findUsersByRole = async (role: string) => {
  const { data } = await axiosWithCredentials.get(`${USERS_API}?role=${role}`);
  return data;
};

export const findUsersByPartialName = async (name: string) => {
  const { data } = await axiosWithCredentials.get(`${USERS_API}?name=${name}`);
  return data;
};
