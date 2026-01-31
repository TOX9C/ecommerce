import prisma from "../prisma_client";
import { Request, Response } from "express";

const make = async (req: Request, res: Response): Promise<Response> => {
  const { name, category, price, description, imgUrl } = req.body;
  try {
    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        category,
        price,
        ProductImages: {
          create: imgUrl.map((url: string) => ({
            url,
          })),
        },
      },
    });
    return res.json({ message: name + " is added" });
  } catch (error) {
    console.error("Product creation error:", error);
    return res.status(500).json({ message: "Failed to create product" });
  }
};

const update = async (req: Request, res: Response): Promise<Response> => {
  const { id, name, price, category, description, imgUrl } = req.body;
  try {
    await prisma.product.update({
      where: {
        id,
      },
      data: {
        name,
        price,
        category,
        description,
        ProductImages: {
          deleteMany: {},
          create: imgUrl.map((url: string) => ({
            url,
          })),
        },
      },
    });
    return res.json({ message: name + " has been updated" });
  } catch (error) {
    console.error("Product update error:", error);
    return res.status(500).json({ message: "Failed to update product" });
  }
};

const get = async (req: Request, res: Response): Promise<Response> => {
  const { limit } = req.query;
  const take = limit ? parseInt(limit as string, 10) : 15;

  try {
    const items = await prisma.product.findMany({
      include: {
        ProductImages: true,
      },
      orderBy: {
        created_at: "desc",
      },
      take: take,
    });
    return res.json({ items });
  } catch (error) {
    console.error("Product fetch error:", error);
    return res.status(500).json({ message: "Failed to fetch products" });
  }
};

const search = async (req: Request, res: Response): Promise<Response> => {
  const { search } = req.query;
  const searchQuery = typeof search === "string" ? search : "";
  try {
    const items = await prisma.product.findMany({
      include: {
        ProductImages: true,
      },
      where: {
        name: { contains: searchQuery },
      },
      take: 15,
    });
    return res.json({ items });
  } catch (error) {
    console.error("Product search error:", error);
    return res.status(500).json({ message: "Failed to search products" });
  }
};

const searchCategory = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { category } = req.query;
  const categoryQuery = typeof category === "string" ? category : "";
  try {
    const items = await prisma.product.findMany({
      include: {
        ProductImages: true,
      },
      where: { category: { contains: categoryQuery } },
      take: 10,
    });
    return res.json({ items });
  } catch (error) {
    console.error("Category search error:", error);
    return res.status(500).json({ message: "Failed to search by category" });
  }
};

const getById = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const productId = Array.isArray(id) ? id[0] : id;
  try {
    const product = await prisma.product.findUnique({
      include: {
        ProductImages: true,
      },
      where: { id: parseInt(productId, 10) },
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.json({ product });
  } catch (error) {
    console.error("Get product error:", error);
    return res.status(500).json({ message: "Failed to fetch product" });
  }
};

const remove = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const productId = Number(id);
  try {
    await prisma.product.delete({
      where: { id: productId },
    });
    return res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Product delete error:", error);
    return res.status(500).json({ message: "Failed to delete product" });
  }
};

export default { make, update, get, search, searchCategory, getById, remove };
