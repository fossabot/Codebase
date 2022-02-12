import { getClient } from "../../utils";

const client = getClient();

export const signUp = async (email: string, password: string) =>
  await client.auth.signUp({ email, password });

export const login = async (email: string, password: string) =>
  await client.auth.signIn({ email, password }, { redirectTo: "/app/groups" });
