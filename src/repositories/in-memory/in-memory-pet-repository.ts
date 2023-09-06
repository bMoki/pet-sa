import { Pet } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { PetCreateInput, PetRepository } from "../pet-repository";
import { InMemoryOrgRepository } from "./in-memory-org-repository";


export class InMemoryPetRepository implements PetRepository {
  public pets: Pet[] = []
  private orgRepository: InMemoryOrgRepository = new InMemoryOrgRepository()

  async create(data: PetCreateInput) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      about: data.about,
      stage: data.stage,
      energy_level: data.energy_level,
      size: data.size,
      environment: data.environment,
      org_id: data.org_id,
      photos: data.photos ?? [],
      requirements: data.requirements ?? []
    }
    this.pets.push(pet);
    return pet
  }

  async findById(id: string) {
    const pet = this.pets.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async deleteById(id: string) {
    const pets = this.pets.filter((item) => item.id !== id)
    this.pets = pets
    return
  }

  // async findAllInCity(address: string) {
  // const orgs = this.orgRepository.orgs.filter((item) =>
  //   item.address.toUpperCase().includes(address.toLocaleUpperCase())
  // )
  // console.log({ orgs })
  // const pets = this.pets.filter((item) =>
  //   orgs.find((org) => org.id === item.org_id)
  // )

  // return pets
  // }
}