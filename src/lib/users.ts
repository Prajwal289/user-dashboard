import { api } from "./axios";

export const getUsers = async () => {
  const res = await api.get("/users");
  return res.data;
};
export const addUser = async (newUser: any) => {
  const res = await api.post("/users", newUser);
  return res.data;
};
export const updateUser = async (user: any) => {
  const res = await api.put(`/users/${user.id}`, user);
  return res.data;
};
export const deleteUser = async (id: number) => {
  const res = await api.delete(`/users/${id}`);
  return res.data;
};
export const getUserById = async (id: string) => {
  const res = await api.get(`/users/${id}`);
  return res.data;
};




