import { Prisma } from "@prisma/client";
import { AddressRepository } from "../address-repository";
import { prisma } from "src/lib/prisma";

export class PrismaAddressRepository implements AddressRepository {
  async create(data: Prisma.AddressUncheckedCreateInput) {
    const address = await prisma.address.create({
      data: {
        numero: data.numero,
        complemento: data.complemento,
        location: {
          connect: { id: data.location_id }
        }
      }

    })

    return address
  }

  async findById(id: string) {
    const address = await prisma.address.findUnique({
      where: {
        id
      }
    })
    return address
  }
}