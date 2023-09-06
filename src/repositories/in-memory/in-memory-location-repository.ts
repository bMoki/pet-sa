import { Location, Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { LocationRepository } from "../location-repository";

export class InMemoryLocationRepository implements LocationRepository {
  public locations: Location[] = []

  async create(data: Prisma.LocationCreateInput) {
    const location = {
      id: randomUUID(),
      cep: data.cep,
      uf: data.uf,
      bairro: data.bairro,
      localidade: data.localidade,
      logradouro: data.logradouro
    }
    this.locations.push(location);
    return location
  }

  async findByCep(cep: string) {
    const location = this.locations.find((item) => item.cep === cep)

    if (!location) {
      return null
    }

    return location
  }
}