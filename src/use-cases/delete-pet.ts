import { PetRepository } from "src/repositories/pet-repository"
import { ResourceNotFound } from "./error/resource-not-found"


interface DeletePetUseCaseRequest {
  id: string
}


export class DeletePetUseCase {
  constructor(
    private petRepository: PetRepository
  ) { }

  async execute({
    id
  }: DeletePetUseCaseRequest) {

    const pet = await this.petRepository.findById(id)

    if (!pet) {
      throw new ResourceNotFound()
    }

    await this.petRepository.deleteById(id);

    return
  }

}