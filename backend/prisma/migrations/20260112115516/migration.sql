/*
  Warnings:

  - You are about to drop the column `userId` on the `CartItem` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[productId,cartId]` on the table `CartItem` will be added. If there are existing duplicate values, this will fail.
  - Made the column `cartId` on table `CartItem` required. This step will fail if there are existing NULL values in that column.
  - Made the column `orderId` on table `OrderItem` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_cartId_fkey";

-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_userId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_orderId_fkey";

-- DropIndex
DROP INDEX "CartItem_productId_userId_key";

-- AlterTable
ALTER TABLE "CartItem" DROP COLUMN "userId",
ALTER COLUMN "quantity" DROP DEFAULT,
ALTER COLUMN "cartId" SET NOT NULL;

-- AlterTable
ALTER TABLE "OrderItem" ALTER COLUMN "orderId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CartItem_productId_cartId_key" ON "CartItem"("productId", "cartId");

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
