import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";

export const comparePasswords = async (password: string, hashedPassword: string) => {
  return await bcrypt.compareSync(password, hashedPassword);
};

export const hashPassword = async (password: string) => {
  return await bcrypt.hashSync(password, 10);
};

export const createJWT = (user: any) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET as string,
    {
      algorithm: "HS256", // Use a strong algorithm
      expiresIn: "1h", // Set an expiration time
    }
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
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET must be defined in environment variables');
    }
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET environment variable is not set');
    }
    
    const jwtSecret: string = process.env.JWT_SECRET;
    const payload = jwt.verify(token, jwtSecret) as UserPayload;
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error('Invalid token');
    } else if (error instanceof jwt.TokenExpiredError) {
      throw new Error('Token has expired');
    } else {
      throw error;
    }
  }
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as UserPayload;

    if (!payload || typeof payload !== 'object' || !payload.id || !payload.username) {
      throw new Error('Invalid token payload');
    }

    req.user = { id: payload.id, username: payload.username }; // Only include necessary fields
    next();
    return;
  } catch (e) {
    console.error(e);
    res.status(401);
    res.send("Not authorized");
    return;
  }
};