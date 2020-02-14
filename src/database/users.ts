import { db } from "../../knexfile";
import { User } from "../models/User";

export const find = async () =>
  await db<User>("users").select("id", "username", "department");

export const findBy = async (filter: Partial<User>) =>
  await db<User>("users")
    .where(filter)
    .first();

export const add = async (user: User) => {
  const [id] = await db<User>("users").insert(
    { department: "Marvel", ...user },
    "id"
  );
  return await findById(id);
};

export const findById = async (id: string) =>
  await db<User>("users")
    .where({ id })
    .first();
