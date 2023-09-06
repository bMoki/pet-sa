/*
  Warnings:

  - You are about to drop the column `org_id` on the `Address` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[address_id]` on the table `orgs` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address_id` to the `orgs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_org_id_fkey";

-- DropIndex
DROP INDEX "Address_org_id_key";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "org_id";

-- AlterTable
ALTER TABLE "orgs" ADD COLUMN     "address_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "orgs_address_id_key" ON "orgs"("address_id");

-- AddForeignKey
ALTER TABLE "orgs" ADD CONSTRAINT "orgs_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
