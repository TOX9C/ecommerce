import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

type ValidationTarget = "body" | "params" | "query";

export const validate = (schema: ZodSchema, target: ValidationTarget = "body") => {
    return (req: Request, res: Response, next: NextFunction): Response | void => {
        try {
            const data = target === "body" ? req.body : target === "params" ? req.params : req.query;
            schema.parse(data);
            next();
        } catch (err) {
            if (err instanceof ZodError) {
                const errors = err.issues.map((issue) => ({
                    field: issue.path.join("."),
                    message: issue.message,
                }));
                return res.status(400).json({
                    message: "Validation failed",
                    errors,
                });
            }
            return res.status(500).json({ message: "Internal server error" });
        }
    };
};
