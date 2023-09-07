
import { expect, beforeEach, describe, it } from 'vitest'
import { InMemoryPetRepository } from "src/repositories/in-memory/in-memory-pet-repository";
import { CreatePetUseCase } from "./create-pet";
import { InMemoryOrgRepository } from 'src/repositories/in-memory/in-memory-org-repository';
import { ResourceNotFound } from './error/resource-not-found';
import { FindPetByIdUseCase } from './find-pet-by-id';

let petRepository: InMemoryPetRepository
let orgRepository: InMemoryOrgRepository
let sut: FindPetByIdUseCase

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    petRepository = new InMemoryPetRepository()
    orgRepository = new InMemoryOrgRepository()
    sut = new FindPetByIdUseCase(petRepository)
  })

  it('should be able to create pet', async () => {
    const org = await orgRepository.create(
      {
        address_id: 'address_id',
        email: 'org@gmail.com',
        name: 'org',
        password: '123456',
        whatsapp: '(11)123456789'
      }
    )

    const petSaved = await petRepository.create({
      about: '',
      energy_level: 'MEDIUM',
      environment: 'MEDIUM',
      size: 'BIG',
      stage: 'PUPPY',
      name: 'PET_1',
      org_id: org.id,
      photos: [],
      requirements: [],
      independence_level: 'LOW',
    })

    const { pet } = await sut.execute({ id: petSaved.id })

    expect(pet.id).toEqual(petSaved.id)
    expect(pet.name).toEqual(petSaved.name)
  })

  it('should not be able to find pet with nonexisting id', async () => {

    await expect(() =>
      sut.execute({
        id: 'nonexisting_id'
      }),
    ).rejects.toBeInstanceOf(ResourceNotFound)

  })
})