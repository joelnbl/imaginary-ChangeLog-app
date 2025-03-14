import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";

export const comparePasswords = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const createJWT = (user: any) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET as string
  );
  return token;
};

interface UserPayload {
  id: string;
  username: string;
}

interface AuthenticatedRequest extends Request {
  user?: UserPayload;
}

export const protect = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    res.send("Not authorized");
    return;
  }
  
  const [, token] = bearer.split(" ");
  if (!token) {
    res.status(401);
    res.send("Not authorized");
    return;
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as UserPayload;
    req.user = payload;
    console.log(payload);
    next();
    return;
  } catch (e) {
    console.error(e);
    res.status(401);
    res.send("Not authorized");
    return;
  }
};