import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

export const generateToken = (userId: string) => {
  return jwt.sign({ sub: userId }, JWT_SECRET, {
    expiresIn: "1d",
  });
};


