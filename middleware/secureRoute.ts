import { NextFunction, Request, Response } from "express";
import { SECRET } from "../config/environment";
import jwt, { JwtPayload } from "jsonwebtoken";
import Users from "../models/users";

export default function secureRoute(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("This route is secure!");
  const rawToken = req.headers.authorization;
  if (!rawToken) {
    return res.status(401).json({ message: "You are not authorized" });
  }
  const token = rawToken.replace("Bearer ", "");
  jwt.verify(token, SECRET, async (err, payload) => {
    console.log("verifying token...");
    if (err || !payload) {
      return res.status(401).json({ message: "You are not authorized" });
    }
    interface JwtPayload {
      userId: string;
    }

    const JwtPayload = payload as JwtPayload;
    const userId = JwtPayload.userId;

    const user = await Users.findById(userId);

    if (!user)
      return res.status(401).json({ message: "You are not authorized" });

    res.locals.currentUser = user;

    next();
  });
}
