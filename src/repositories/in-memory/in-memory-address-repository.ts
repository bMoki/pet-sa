import { Address, Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { AddressRepository } from "../address-repository";



export class InMemoryAddressRepository implements AddressRepository {
  public addresses: Address[] = []

  async create(data: Prisma.AddressUncheckedCreateInput) {
    const address = {
      id: randomUUID(),
      location_id: data.location_id,
      numero: data.numero,
      complemento: data.complemento ?? null
    }
    this.addresses.push(address);
    return address
  }

  async findById(id: string) {
    const address = this.addresses.find((item) => item.id === id)

    if (!address) {
      return null
    }
    return address
  }
}