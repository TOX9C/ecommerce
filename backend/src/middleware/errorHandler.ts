import { Request, Response, NextFunction } from "express";

export interface ErrorResponse {
    message: string;
    errors?: Array<{ field: string; message: string }>;
    stack?: string;
}

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): Response => {
    console.error("Error:", err);

    const response: ErrorResponse = {
        message: err.message || "Internal server error",
    };

    // Include stack trace only in development
    if (process.env.NODE_ENV === "development") {
        response.stack = err.stack;
    }

    return res.status(500).json(response);
};
