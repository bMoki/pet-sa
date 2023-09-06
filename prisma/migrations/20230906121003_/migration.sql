/*
  Warnings:

  - You are about to drop the column `address_id` on the `orgs` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[org_id]` on the table `Address` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `org_id` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "orgs" DROP CONSTRAINT "orgs_address_id_fkey";

-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "org_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "orgs" DROP COLUMN "address_id";

-- CreateIndex
CREATE UNIQUE INDEX "Address_org_id_key" ON "Address"("org_id");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "orgs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
