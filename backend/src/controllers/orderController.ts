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
      // Calculate total amount
      const totalAmount = cart.item.reduce((acc, item) => {
        return acc + item.product.price * item.quantity;
      }, 0);

      const order = await tx.order.create({
        data: {
          userId,
          status: "pending",
          totalAmount: totalAmount,
          items: {
            create: cart.item.map((cartItem) => ({
              productId: cartItem.productId,
              quantity: cartItem.quantity,
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
  const userRole = (req as any).user.role;
  try {
    // Build where clause - admins see all orders, users see only their own
    const whereClause: any = {};
    if (userRole !== "admin") {
      whereClause.userId = userId;
    }

    const orders = await prisma.order.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            username: true,
            phoneNumber: true,
            street: true,
            city: true,
            town: true,
          },
        },
        items: {
          include: {
            product: {
              include: {
                ProductImages: true,
              },
            },
          },
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
const updateStatus = async (
  req: AuthRequest,
  res: Response,
): Promise<Response> => {
  const { id } = req.params;
  const { status } = req.body;
  const userId = req.user!.id;
  const orderId = Array.isArray(id) ? id[0] : id;
  const userRole = (req as any).user.role;

  try {
    // If admin, they can update any order. If user, only their own (technically usually users don't update status, but if they could cancel...)
    const whereClause: any = { id: parseInt(orderId, 10) };
    if (userRole !== "admin") {
      whereClause.userId = userId;
    }

    const order = await prisma.order.findFirst({
      where: whereClause,
    });
    if (!order) {
      return res
        .status(404)
        .json({ message: "Order not found or unauthorized" });
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

const removeOrder = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const orderId = Array.isArray(id) ? id[0] : id;
  try {
    await prisma.order.delete({
      where: {
        id: parseInt(orderId),
      },
    });
    return res.json({ message: "order removed" });
  } catch (error) {
    console.log(error);
  }
};

export default { getOrder, checkout, updateStatus, removeOrder };
