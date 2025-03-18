import prisma from "../db";
import { Request, Response } from "express";

// GET ALL
export const getProducts = async (req: Request, res: Response) => {
    const user = await prisma.user.findUnique({
        where: {
            id: req.user.id,
        },
        include: {
            products: true,
        },
    });
    res.json({ data: user.products });
    }

    // GET ONE
export const getOneProduct = async (req: Request, res: Response) => {
    const id = req.params.id;
    const product = await prisma.product.findFirst({
        where: {
            id,
            belongsToId: req.user.id,
        },
    });
    res.json({ data: product });
    }

    // UPDATE
export const updateProduct = async (req: Request, res: Response) => {
    const updated = await prisma.product.update({
        where: {
            id: req.params.id,
            belongsToId: req.user.id,
        },
        data: {
            name: req.body.name,
        },
    });

    res.json({ data: updated });
    }

    // Delete
export const deleteProduct = async (req: Request, res: Response) => {
    const deleted = await prisma.product.delete({
        where: {
            id: req.params.id,
            belongsToId: req.user.id,
        },
    });

    res.json({ data: deleted });
    }