import axios from "axios";

export const signUp = async (email: string, password: string) => {
  return await axios.post("/api/auth/signup", {
    email,
    password,
  });
};

export const signIn = async (email: string, password: string) => {
  console.log({ email, password });
  return await axios.post("/api/auth/login", {
    email,
    password,
  });
};

export const checkAuth = async () => {
  try {
    const { data: result } = await axios.get("/api/auth/status");
    return result.status === "AUTHED";
  } catch {
    return false;
  }
};

export const getUser = async () => {
  const { data: result } = await axios.get("/api/auth/user");
  return result;
};
