import orderController from "../controllers/orderController";
import authUser from "../auth";
import { Router } from "express";
import { validate } from "../middleware/validateRequest";
import { updateOrderStatusParamsSchema, updateOrderStatusBodySchema } from "../validators/orderValidator";

const orderRouter = Router();

orderRouter.post("/make", authUser, orderController.checkout);
orderRouter.get("/get", authUser, orderController.getOrder);
orderRouter.patch("/:id/status", authUser, validate(updateOrderStatusParamsSchema, "params"), validate(updateOrderStatusBodySchema, "body"), orderController.updateStatus);

export default orderRouter;
