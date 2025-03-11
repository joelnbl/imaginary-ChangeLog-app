import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";
import { Request, Response, NextFunction } from "express";

export const createNewUser = async (req: Request, res: Response) => {
  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      password: await hashPassword(req.body.password),
    },
  });

  const token = createJWT(user);
  res.json({ token });
};

export const signin = async (req: Request, res: Response) => {
 const user = await prisma.user.findUnique({
    where: {
        username: req.body.username,
    }
 });

 if (!user) {
    res.status(401);
    res.json({ message: "User not found" });
    return;
 }

 const isValid = await comparePasswords(req.body.password, user.password);

    if (!isValid) {
    res.status(401);
    res.json({ message: "nope"})
    return;
    }

    const token = createJWT(user);
    res.json({ token });

};