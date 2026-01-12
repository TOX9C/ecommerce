import prisma from "../prisma_client";
import { Request, Response } from "express";

interface AuthRequest extends Request {
  user?: {
    id: number;
  };
}

const checkout = async (req: AuthRequest, res: Response): Promise<Response> => {
  const userId = req.user!.id;
  try {
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        item: {
          include: { product: true },
        },
      },
    });
    if (!cart || cart.item.length === 0)
      return res.status(400).json({ message: "cart is empty" });
    const result = await prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          userId,
          status: "pending",
          items: {
            create: cart.item.map((cartItem) => ({
              productId: cartItem.productId,
              quantity: cartItem.quantity,
              // FIXED: Changed to cartItem.product.price since CartItem doesn't have price field
              price: cartItem.product.price,
            })),
          },
        },
      });
      await tx.cartItem.deleteMany({
        where: { cartId: cart.id },
      });
      return order;
    });
    return res.json({ message: "order created", order: result });
  } catch (error) {
    console.error("Checkout error:", error);
    return res.status(500).json({ message: "Failed to create order" });
  }
};

const getOrder = async (req: AuthRequest, res: Response): Promise<Response> => {
  const userId = req.user!.id;
  try {
    const orders = await prisma.order.findMany({
      where: {
        userId,
      },
      include: {
        items: {
          include: { product: true },
        },
      },
      orderBy: { created_at: "desc" },
    });
    return res.json({ orders });
  } catch (error) {
    console.error("Get orders error:", error);
    return res.status(500).json({ message: "Failed to fetch orders" });
  }
};
const updateStatus = async (req: AuthRequest, res: Response): Promise<Response> => {
  const { id } = req.params;
  const { status } = req.body;
  const userId = req.user!.id;
  const orderId = Array.isArray(id) ? id[0] : id;
  try {
    // First check if the order belongs to the user
    const order = await prisma.order.findFirst({
      where: {
        id: parseInt(orderId, 10),
        userId,
      },
    });
    if (!order) {
      return res.status(404).json({ message: "Order not found or unauthorized" });
    }
    // Update the order status
    const updatedOrder = await prisma.order.update({
      where: { id: parseInt(orderId, 10) },
      data: { status },
    });
    return res.json({ message: "Order status updated", order: updatedOrder });
  } catch (error) {
    console.error("Update order status error:", error);
    return res.status(500).json({ message: "Failed to update order status" });
  }
};

export default { getOrder, checkout, updateStatus };
