import { SECRET } from ".";
import jwt from "jsonwebtoken";

export const createToken = (payload: any) => {
  const token = jwt.sign(payload, SECRET);
  return token;
};

export const getTokenPayload = (token: string) => {
  try {
    const payload = jwt.verify(token, SECRET);
    return payload;
  } catch {
    return null;
  }
};
