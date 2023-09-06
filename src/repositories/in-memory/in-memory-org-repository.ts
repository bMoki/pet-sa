import { Org, Prisma } from "@prisma/client";
import { OrgRepository } from "../org-repository";
import { randomUUID } from "node:crypto";

export class InMemoryOrgRepository implements OrgRepository {
  public orgs: Org[] = []

  async create(data: Prisma.OrgUncheckedCreateInput) {
    const org = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      address_id: data.address_id,
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