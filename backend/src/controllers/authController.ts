import prisma from "../prisma_client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

const login = async (req: Request, res: Response): Promise<Response> => {
  const { username, password } = req.body;
  try {
    const user = await prisma.user.findFirst({
      where: {
        username,
      },
    });
    if (!user) return res.status(404).json({ message: "no such username" });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "wrong password" });
    const token = await jwt.sign({ id: user.id }, process.env.JWT_CODE!, {
      expiresIn: "7d",
    });
    return res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const register = async (req: Request, res: Response): Promise<Response> => {
  const { username, password } = req.body;
  try {
    const user = await prisma.user.findFirst({
      where: {
        username,
      },
    });
    if (user)
      return res.status(400).json({ message: "username already taken" });
    const salt = await bcrypt.genSalt(10);
    const passhash = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        username,
        password: passhash,
      },
    });

    const token = await jwt.sign({ id: newUser.id }, process.env.JWT_CODE!, {
      expiresIn: "7d",
    });
    return res.json({ token });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default { login, register };
