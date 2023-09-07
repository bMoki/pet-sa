import { Prisma } from "@prisma/client";
import { prisma } from "src/lib/prisma";
import { OrgRepository } from "../org-repository";

export class PrismaOrgRepository implements OrgRepository {
  async create(data: Prisma.OrgUncheckedCreateInput) {
    const org = await prisma.org.create({
      data: {
        name: data.name,
        email: data.email,
        whatsapp: data.whatsapp,
        password: data.password,
        address: {
          connect: { id: data.address_id }
        }
      }

    })

    return org
  }

  async findById(id: string) {
    const org = await prisma.org.findUnique({
      where: {
        id
      }
    })
    return org
  }

  async findByEmail(email: string) {
    const org = await prisma.org.findUnique({
      where: {
        email,
      }
    })

    return org
  }
}