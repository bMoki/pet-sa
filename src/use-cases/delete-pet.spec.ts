
import { expect, beforeEach, describe, it } from 'vitest'
import { InMemoryPetRepository } from "@/repositories/in-memory/in-memory-pet-repository";
import { ResourceNotFound } from './error/resource-not-found';
import { DeletePetUseCase } from './delete-pet';

let petRepository: InMemoryPetRepository
let sut: DeletePetUseCase

describe('Delete Pet Use Case', () => {
  beforeEach(() => {
    petRepository = new InMemoryPetRepository()
    sut = new DeletePetUseCase(petRepository)
  })

  it('should not be able to delete pet with nonexisting id', async () => {

    await expect(() =>
      sut.execute({
        id: 'nonexistingID'
      }),
    ).rejects.toBeInstanceOf(ResourceNotFound)

  })

  it('should be able to delete pet', async () => {
    const petsBeforeDelete = petRepository.pets
    await petRepository.create(
      {
        about: '',
        energy_level: 'MEDIUM',
        environment: 'MEDIUM',
        size: 'BIG',
        stage: 'PUPPY',
        name: 'PET_TO_STAY',
        org_id: '1',
        photos: [],
        requirements: [],
      }
    )

    const petToDelete = await petRepository.create(
      {
        about: '',
        energy_level: 'MEDIUM',
        environment: 'MEDIUM',
        size: 'BIG',
        stage: 'PUPPY',
        name: 'PET_TO_DELETE',
        org_id: '1',
        photos: [],
        requirements: [],
      }
    )


    await sut.execute({
      id: petToDelete.id
    })

    const petsAfterDelete = petRepository.pets

    expect(petsBeforeDelete).toHaveLength(2)
    expect(petsAfterDelete).toHaveLength(1)
    expect(petsAfterDelete).toEqual([
      expect.objectContaining({ name: 'PET_TO_STAY' }),
    ])
  })
})