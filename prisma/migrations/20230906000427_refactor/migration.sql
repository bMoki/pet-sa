/*
  Warnings:

  - You are about to drop the column `bairro` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `cep` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `localidade` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `logradouro` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `uf` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `cep` on the `orgs` table. All the data in the column will be lost.
  - You are about to drop the `Place` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `location_id` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numero` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Place" DROP CONSTRAINT "Place_address_id_fkey";

-- DropIndex
DROP INDEX "Address_cep_key";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "bairro",
DROP COLUMN "cep",
DROP COLUMN "localidade",
DROP COLUMN "logradouro",
DROP COLUMN "uf",
ADD COLUMN     "complemento" TEXT,
ADD COLUMN     "location_id" TEXT NOT NULL,
ADD COLUMN     "numero" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "orgs" DROP COLUMN "cep";

-- DropTable
DROP TABLE "Place";

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "logradouro" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "localidade" TEXT NOT NULL,
    "uf" TEXT NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Location_cep_key" ON "Location"("cep");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
