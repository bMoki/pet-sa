
import { PrismaAddressRepository } from "@/repositories/prisma/prisma-address-repository"
import { CreateAddressUseCase } from "../create-address"
import { PrismaLocationRepository } from "@/repositories/prisma/prisma-location-repository"

export function makeCreateAddressUseCase() {
  const addressRepository = new PrismaAddressRepository()
  const locationRepository = new PrismaLocationRepository()
  const useCase = new CreateAddressUseCase(addressRepository, locationRepository)

  return useCase
}