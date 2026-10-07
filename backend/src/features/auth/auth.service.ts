import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { users } from "../../db/schema/user.js";
import bcrypt from "bcrypt";
import { ApiError } from "../../utils/api-error.js";

const userColumns = {
  id: users.id,
  name: users.name,
  email: users.email,
};

export const registerService = async (
  name: string,
  email: string,
  password: string,
) => {
  const [existingUser] = await db
    .select(userColumns)
    .from(users)
    .where(eq(users.email, email));

  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const [newUser] = await db
    .insert(users)
    .values({ name, email, passwordHash })
    .returning(userColumns);

  return newUser;
};

export const loginService = async (email: string, password: string) => {
  const [existingUser] = await db
    .select()
    .from(users)
    .where(eq(users.email, email));

  if (!existingUser) {
    throw new ApiError(400, "Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, existingUser.passwordHash);

  if (!isMatch) {
    throw new ApiError(400, "Invalid credentials");
  }

  return {
    id: existingUser.id,
    name: existingUser.name,
    email: existingUser.email,
  };
};

export const getMeService = async (userId: string) => {
  const [user] = await db
    .select(userColumns)
    .from(users)
    .where(eq(users.id, userId));

  return user;
};
