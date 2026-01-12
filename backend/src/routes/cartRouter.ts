import { Router } from "express";
import cartController from "../controllers/cartController";
import authUser from "../auth";
import { validate } from "../middleware/validateRequest";
import { addItemSchema, removeItemSchema } from "../validators/cartValidator";

const cartRouter = Router();

cartRouter.get("/", authUser, cartController.getCart);
cartRouter.post("/add", authUser, validate(addItemSchema), cartController.addItem);
cartRouter.post("/remove", authUser, validate(removeItemSchema), cartController.removeItem);

export default cartRouter;
