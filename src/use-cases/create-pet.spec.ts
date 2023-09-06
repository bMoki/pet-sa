
import { expect, beforeEach, describe, it } from 'vitest'
import { InMemoryPetRepository } from "@/repositories/in-memory/in-memory-pet-repository";
import { CreatePetUseCase } from "./create-pet";
import { InMemoryOrgRepository } from '@/repositories/in-memory/in-memory-org-repository';
import { ResourceNotFound } from './error/resource-not-found';

let petRepository: InMemoryPetRepository
let orgRepository: InMemoryOrgRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    petRepository = new InMemoryPetRepository()
    orgRepository = new InMemoryOrgRepository()
    sut = new CreatePetUseCase(petRepository, orgRepository)
  })

  it('should not be able to create with a nonexisting org', async () => {

    await expect(() =>
      sut.execute({
        about: '',
        energy_level: 'MEDIUM',
        environment: 'MEDIUM',
        size: 'BIG',
        stage: 'PUPPY',
        independence_level: 'LOW',
        name: 'Rex',
        org_id: '1',
        photos: [],
        requirements: [],
      }),
    ).rejects.toBeInstanceOf(ResourceNotFound)

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

    const { pet } = await sut.execute({
      about: '',
      energy_level: 'MEDIUM',
      environment: 'MEDIUM',
      size: 'BIG',
      stage: 'PUPPY',
      name: 'Rex',
      org_id: org.id,
      photos: [],
      requirements: [],
      independence_level: 'LOW',
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})