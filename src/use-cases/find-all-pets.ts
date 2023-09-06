import { PetRepository } from "@/repositories/pet-repository";
import { Energy, IndependenceLevel, Pet, Size, Stage } from "@prisma/client";

interface FindAllPetsUseCaseRequest {
  stage?: Stage,
  energy_level?: Energy,
  size?: Size,
  independence_level?: IndependenceLevel,
  uf: string,
  city: string
}

interface FindAllPetsUseCaseResponse {
  pets: Pet[]
}

export class FindAllPetsUseCase {
  constructor(
    private petRepository: PetRepository
  ) { }

  async execute({
    city,
    uf,
    energy_level,
    independence_level,
    size,
    stage
  }: FindAllPetsUseCaseRequest): Promise<FindAllPetsUseCaseResponse> {

    const pets = await this.petRepository.findAll({
      city,
      uf,
      energy_level,
      independence_level,
      size,
      stage
    })

    return { pets }

  }
}