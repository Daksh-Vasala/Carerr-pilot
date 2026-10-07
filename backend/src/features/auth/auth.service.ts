import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { users } from "../../db/schema/user.js";
import bcrypt from "bcrypt";

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
    throw new Error("USERALREADYEXISTS");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = await db
    .insert(users)
    .values({ name, email, passwordHash })
    .returning(userColumns);

  return newUser;
};
