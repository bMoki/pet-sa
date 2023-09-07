import { PrismaAddressRepository } from "@/repositories/prisma/prisma-address-repository";
import { PrismaOrgRepository } from "@/repositories/prisma/prisma-org-repository";
import { CreateOrgUseCase } from "../create-org";

export function makeCreateOrgUseCase() {
  const orgRepository = new PrismaOrgRepository()
  const addressRepository = new PrismaAddressRepository()
  const useCase = new CreateOrgUseCase(orgRepository, addressRepository)

  return useCase
}