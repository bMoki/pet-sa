import { Org, Prisma } from "@prisma/client";
import { OrgRepository } from "../org-repository";
import { randomUUID } from "node:crypto";
import { ResourceNotFound } from "@/use-cases/error/resource-not-found";

export class InMemoryOrgRepository implements OrgRepository {
  private orgs: Org[] = []

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      address: data.address,
      cep: data.cep,
      whatsapp: data.whatsapp,
      password: data.password,
      pets: data.pets
    }
    this.orgs.push(org);
    return org
  }
  async findByEmail(email: string) {
    const org = this.orgs.find((item) => item.email === email)

    if (!org) {
      return null
    }

    return org

  }

  async findById(id: string) {
    const org = this.orgs.find((item) => item.id === id)

    if (!org) {
      return null
    }

    return org
  }

}