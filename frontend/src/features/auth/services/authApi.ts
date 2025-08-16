import api from "@/config/axios";

export const login = async (credentials: { email: string; password: string }) => {
  const { data } = await api.post("/auth/login", credentials);
  return data; // expected { token, user }
};

export const getProfile = async () => {
  const { data } = await api.get("/auth/me");
  return data; // user object
};
