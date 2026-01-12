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

const productRouter = Router();

productRouter.post("/make", validate(createProductSchema), productController.make);
productRouter.post("/update", validate(updateProductSchema), productController.update);
// Changed to GET - search operations should be idempotent
productRouter.get("/search", validate(searchProductSchema, "query"), productController.search);
productRouter.get("/searchCategory", validate(searchCategorySchema, "query"), productController.searchCategory);
productRouter.get("/get", productController.get);
productRouter.get("/:id", validate(getProductByIdSchema, "params"), productController.getById);

export default productRouter;
