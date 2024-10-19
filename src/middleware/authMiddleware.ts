// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Extend the Request interface to include the user property
declare module "express-serve-static-core" {
  interface Request {
    user?: { id: string };
  }
}

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

interface JwtPayload {
  userId: string;
}

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = { id: decoded.userId }; // Attach the decoded user ID to the request object
    next(); // Continue to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
    return;
    res.status(401).json({ message: "Invalid token" });
  }
};
