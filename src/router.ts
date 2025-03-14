import { Router, Request, Response } from "express";
const router = Router();
import { body, oneOf } from "express-validator";
import { handleInputsErrors } from "./modules/middleware";

/*
 ** Product
 */

router.get("/product", (req: Request, res: Response) => {
  res.json({ message: "message" });
});
router.get("/product/:id", () => {});
router.put(
  "/product/:id",
  body("name").isString(),
  handleInputsErrors,
  (req, res) => {}
);
router.post("/product", () => {});
router.delete("/product/:id", () => {});

/*
 ** Update
 */

router.get("/update", () => {});
router.get("/update/:id", () => {});
router.put(
  "/update/:id",
  body("title").optional(),
  body("body").optional(),
  body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']),
  body("version").optional(),
  handleInputsErrors,
  () => {}
);
router.post(
  "/update",
  body("title").exists().isString(),
  body("body").exists().isString(),
  handleInputsErrors,
  () => {}
);
router.delete("/update/:id", () => {});

/*
 ** Update Point
 */

router.get("/updatepoint", () => {});
router.get("/updatepoint/:id", () => {});
router.put(
  "/updatepoint/:id",
  body("name").optional().isString(),
  body("description").optional().isString(),
  () => {}
);
router.post(
  "/updatepoint",
  body("name").isString(),
  body("description").isString(),
  body("updateId").exists().isString(),
  () => {}
);
router.delete("/updatepoint/:id", () => {});

export default router;
