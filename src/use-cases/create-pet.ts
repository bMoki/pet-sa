import { OrgRepository } from "@/repositories/org-repository"
import { PetRepository } from "@/repositories/pet-repository"
import { Energy, Environment, IndependenceLevel, Pet, Size, Stage } from "@prisma/client"
import { ResourceNotFound } from "./error/resource-not-found"


interface CreatePetUseCaseRequest {
  name: string,
  about: string,
  org_id: string,
  stage: Stage,
  energy_level: Energy,
  size: Size,
  environment: Environment,
  independence_level: IndependenceLevel,
  photos: string[]
  requirements: string[]
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(
    private petRepository: PetRepository,
    private orgRepository: OrgRepository
  ) { }

  async execute({
    about,
    energy_level,
    environment,
    name,
    org_id,
    photos,
    requirements,
    size,
    stage,
    independence_level
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {

    const org = await this.orgRepository.findById(org_id)

    if (!org) {
      throw new ResourceNotFound()
    }

    const pet = await this.petRepository.create({
      about,
      energy_level,
      environment,
      name,
      org_id,
      photos,
      requirements,
      size,
      stage,
      independence_level
    })

    return { pet }

  }

}