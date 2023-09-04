import { Pet } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { PetCreateInput, PetRepository } from "../pet-repository";

export class InMemoryPetRepository implements PetRepository {
  private pets: Pet[] = []

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
}