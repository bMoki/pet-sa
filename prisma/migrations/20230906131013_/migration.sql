/*
  Warnings:

  - Added the required column `independence_level` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "IndependenceLevel" AS ENUM ('LOW', 'AVARAGE', 'HIGH');

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "independence_level" "IndependenceLevel" NOT NULL;
