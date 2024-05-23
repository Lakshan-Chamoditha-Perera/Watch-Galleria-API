-- CreateEnum
CREATE TYPE "Model" AS ENUM ('UNISEX', 'MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'COMPLETED');

-- CreateTable
CREATE TABLE "Watch" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "imageUrlList" TEXT[],
    "model" "Model" NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "rating" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Watch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "status" "Status" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_OrderToWatch" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_OrderToWatch_AB_unique" ON "_OrderToWatch"("A", "B");

-- CreateIndex
CREATE INDEX "_OrderToWatch_B_index" ON "_OrderToWatch"("B");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderToWatch" ADD CONSTRAINT "_OrderToWatch_A_fkey" FOREIGN KEY ("A") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderToWatch" ADD CONSTRAINT "_OrderToWatch_B_fkey" FOREIGN KEY ("B") REFERENCES "Watch"("id") ON DELETE CASCADE ON UPDATE CASCADE;
