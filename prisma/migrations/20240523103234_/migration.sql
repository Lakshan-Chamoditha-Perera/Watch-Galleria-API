/*
  Warnings:

  - You are about to drop the `_OrderToWatch` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_OrderToWatch" DROP CONSTRAINT "_OrderToWatch_A_fkey";

-- DropForeignKey
ALTER TABLE "_OrderToWatch" DROP CONSTRAINT "_OrderToWatch_B_fkey";

-- DropTable
DROP TABLE "_OrderToWatch";

-- CreateTable
CREATE TABLE "_WatchToOrder" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_WatchToOrder_AB_unique" ON "_WatchToOrder"("A", "B");

-- CreateIndex
CREATE INDEX "_WatchToOrder_B_index" ON "_WatchToOrder"("B");

-- AddForeignKey
ALTER TABLE "_WatchToOrder" ADD CONSTRAINT "_WatchToOrder_A_fkey" FOREIGN KEY ("A") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_WatchToOrder" ADD CONSTRAINT "_WatchToOrder_B_fkey" FOREIGN KEY ("B") REFERENCES "Watch"("id") ON DELETE CASCADE ON UPDATE CASCADE;
