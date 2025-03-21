import { NextFunction, Request, Response } from "express";
export declare const createNewUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const signin: (req: Request, res: Response) => Promise<void>;
