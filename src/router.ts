import { Router, Request, Response } from "express";
const router = Router();
import { body, validationResult } from "express-validator";
import { handleInputsErrors } from "./modules/middleware";

/*
** Product
*/

router.get('/product', (req: Request, res: Response) => {
    res.json({ message: 'message' });
});
router.get('/product/:id', () => {});
router.put('/product/:id', body("name").isString(), handleInputsErrors, (req, res) => {
    
});
router.post('/product', () => {});
router.delete('/product/:id', () => {});

/*
** Update
*/

router.get('/update', () => {});
router.get('/update/:id', () => {});
router.put('/update/:id', () => {});
router.post('/update', () => {});
router.delete('/update/:id', () => {});

/*
** Update Point
*/

router.get('/updatepoint', () => {});
router.get('/updatepoint/:id', () => {});
router.put('/updatepoint/:id', () => {});
router.post('/updatepoint', () => {});
router.delete('/updatepoint/:id', () => {});

export default router;