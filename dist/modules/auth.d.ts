import { Request, Response, NextFunction } from "express";
export declare const comparePasswords: (password: string, hashedPassword: string) => Promise<boolean>;
export declare const hashPassword: (password: string) => Promise<string>;
export declare const createJWT: (user: any) => string;
interface UserPayload {
    id: string;
    username: string;
}
interface AuthenticatedRequest extends Request {
    user?: UserPayload;
}
export declare const protect: (req: AuthenticatedRequest, res: Response, next: NextFunction) => void;
export {};
