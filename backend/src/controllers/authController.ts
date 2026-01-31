import prisma from "../prisma_client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { registerSchema } from "../validators/authValidator";

const login = async (req: Request, res: Response): Promise<Response> => {
  const { username, password } = req.body; // username here can be username OR phone number
  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ username: username }, { phoneNumber: username }],
      },
    });
    if (!user) return res.status(404).json({ message: "no such username or phone number" });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "wrong password" });
    const token = await jwt.sign({ id: user.id, role: (user as any).role, username: user.username }, process.env.JWT_CODE!, {
      expiresIn: "7d",
    });
    return res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const register = async (req: Request, res: Response): Promise<Response> => {
  // Although not using z.parse directly here yet (should refactor to use middleware later), we trust the input presence for now or rely on FE validation + DB constraints
  // Better to add manual validation here or use the schema.
  const { username, password, phoneNumber, street, city, town } = req.body;
  try {
    // Validate using Zod manually for now to ensure safety
    const validation = registerSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ message: "Validation error", errors: validation.error.format() });
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { phoneNumber }],
      },
    });
    if (user)
      return res.status(400).json({ message: "username or phone number already taken" });
    const salt = await bcrypt.genSalt(10);
    const passhash = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        username,
        password: passhash,
        phoneNumber,
        street,
        city,
        town,
      },
    });

    const token = await jwt.sign({ id: newUser.id, role: (newUser as any).role, username: newUser.username }, process.env.JWT_CODE!, {
      expiresIn: "7d",
    });
    return res.json({ token });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default { login, register };
