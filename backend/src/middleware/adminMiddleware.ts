import { Response, NextFunction } from "express";
import { AuthRequest } from "../auth";

const checkAdmin = (req: AuthRequest, res: Response, next: NextFunction): Response | void => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ message: "Admin access required" });
    }
    next();
};

export default checkAdmin;
