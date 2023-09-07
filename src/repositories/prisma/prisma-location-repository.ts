import { Prisma } from "@prisma/client";
import { LocationRepository } from "../location-repository";
import { prisma } from "@/lib/prisma";

export class PrismaLocationRepository implements LocationRepository {
  async create(data: Prisma.LocationCreateInput) {
    const location = prisma.location.create({
      data
    })

    return location
  }

  async findByCep(cep: string) {
    const location = prisma.location.findUnique({
      where: {
        cep
      }
    })

    return location
  }
}