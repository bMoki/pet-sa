import { PetRepository } from "src/repositories/pet-repository"
import { Pet } from "@prisma/client"
import { ResourceNotFound } from "./error/resource-not-found"

interface FindPetByIdUseCaseRequest {
  id: string
}

interface FindPetByIdUseCaseResponse {
  pet: Pet
}

export class FindPetByIdUseCase {
  constructor(
    private petRepository: PetRepository
  ) { }

  async execute({ id }: FindPetByIdUseCaseRequest): Promise<FindPetByIdUseCaseResponse> {

    const pet = await this.petRepository.findById(id)

    if (!pet) {
      throw new ResourceNotFound()
    }

    return { pet }
  }
}