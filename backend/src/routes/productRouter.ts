import { Router } from "express";
import productController from "../controllers/productController";
import { validate } from "../middleware/validateRequest";
import {
    createProductSchema,
    updateProductSchema,
    searchProductSchema,
    searchCategorySchema,
    getProductByIdSchema,
} from "../validators/productValidator";

import checkAdmin from "../middleware/adminMiddleware";
import authUser from "../auth";

const productRouter = Router();

productRouter.post("/make", authUser, checkAdmin, validate(createProductSchema), productController.make);
productRouter.post("/update", authUser, checkAdmin, validate(updateProductSchema), productController.update);
// Changed to GET - search operations should be idempotent
productRouter.get("/search", validate(searchProductSchema, "query"), productController.search);
productRouter.get("/searchCategory", validate(searchCategorySchema, "query"), productController.searchCategory);
productRouter.get("/get", productController.get);
productRouter.get("/:id", validate(getProductByIdSchema, "params"), productController.getById);
productRouter.delete("/:id", authUser, checkAdmin, validate(getProductByIdSchema, "params"), productController.remove);

export default productRouter;
