import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface JWTPayload {
  id: number;
  role: string;
  username: string;
}

export interface AuthRequest extends Request {
  user?: JWTPayload;
}

const authUser = (req: AuthRequest, res: Response, next: NextFunction): Response | void => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ message: "no token" });
  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "no token" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_CODE!) as JWTPayload;
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Auth error:", error);
    // FIXED: Added error response to prevent hanging requests
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authUser;
