import prisma from "../prisma_client";
import { Request, Response } from "express";

interface AuthRequest extends Request {
  user?: {
    id: number;
  };
}

const addItem = async (req: AuthRequest, res: Response): Promise<Response> => {
  const { id, quantity } = req.body;
  const userId = req.user!.id;
  try {
    let cart = await prisma.cart.findUnique({
      where: { userId },
    });
    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId,
        },
      });
    }
    await prisma.cartItem.upsert({
      where: {
        productId_cartId: {
          productId: id,
          cartId: cart.id,
        },
      },
      update: {
        quantity: { increment: quantity },
      },
      create: {
        productId: id,
        cartId: cart.id,
        quantity,
      },
    });
    return res.json({ message: "added to cart" });
  } catch (error) {
    console.error("Add to cart error:", error);
    return res.status(500).json({ message: "Failed to add item to cart" });
  }
};

const removeItem = async (req: AuthRequest, res: Response): Promise<Response> => {
  const { id } = req.body;
  const userId = req.user!.id;
  try {
    const cart = await prisma.cart.findUnique({
      where: { userId },
    });
    if (!cart) {
      return res.status(404).json({ message: "no cart" });
    }
    // FIXED: Changed from cartId_productId to productId_cartId to match schema
    await prisma.cartItem.delete({
      where: {
        productId_cartId: {
          productId: id,
          cartId: cart.id,
        },
      },
    });
    return res.json({ message: "removed from cart" });
  } catch (error) {
    console.error("Remove from cart error:", error);
    return res.status(500).json({ message: "Failed to remove item from cart" });
  }
};

const getCart = async (req: AuthRequest, res: Response): Promise<Response> => {
  const userId = req.user!.id;
  try {
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        item: {
          include: {
            product: {
              include: {
                ProductImages: true,
              },
            },
          },
        },
      },
    });
    if (!cart) {
      return res.json({ items: [] });
    }
    return res.json({ items: cart.item });
  } catch (error) {
    console.error("Get cart error:", error);
    return res.status(500).json({ message: "Failed to fetch cart" });
  }
};

export default { addItem, removeItem, getCart };
