
import { expect, beforeEach, describe, it } from 'vitest'
import { InMemoryPetRepository } from "@/repositories/in-memory/in-memory-pet-repository";
import { InMemoryOrgRepository } from '@/repositories/in-memory/in-memory-org-repository';
import { CreateAddressUseCase } from './create-address';
import { InMemoryAddressRepository } from '@/repositories/in-memory/in-memory-address-repository';
import { InMemoryLocationRepository } from '@/repositories/in-memory/in-memory-location-repository';
import { FindAllPetsUseCase } from './find-all-pets';

let petRepository: InMemoryPetRepository
let orgRepository: InMemoryOrgRepository
let addressRepository: InMemoryAddressRepository
let locationRepository: InMemoryLocationRepository
let createAddressUseCase: CreateAddressUseCase
let sut: FindAllPetsUseCase

describe('Create Pet Use Case', () => {
  beforeEach(async () => {
    orgRepository = new InMemoryOrgRepository()
    addressRepository = new InMemoryAddressRepository()
    locationRepository = new InMemoryLocationRepository()
    petRepository = new InMemoryPetRepository(orgRepository, addressRepository, locationRepository)
    createAddressUseCase = new CreateAddressUseCase(addressRepository, locationRepository)
    sut = new FindAllPetsUseCase(petRepository)

    const { address: address_1 } = await createAddressUseCase.execute({
      bairro: 'Bairro',
      cep: '12345678',
      localidade: 'Cidade_1',
      logradouro: 'Rua',
      numero: '1',
      uf: 'SC',
    })

    const { address: address_2 } = await createAddressUseCase.execute({
      bairro: 'Bairro',
      cep: '87654321',
      localidade: 'Cidade_2',
      logradouro: 'Rua',
      numero: '1',
      uf: 'RS',
    })

    const org_1 = await orgRepository.create(
      {
        address_id: address_1.id,
        email: 'org@gmail.com',
        name: 'org_1',
        password: '123456',
        whatsapp: '(11)123456789'
      }
    )
    const org_2 = await orgRepository.create(
      {
        address_id: address_2.id,
        email: 'org@gmail.com',
        name: 'org_2',
        password: '123456',
        whatsapp: '(11)123456789'
      }
    )

    await petRepository.create({
      about: '',
      energy_level: 'MEDIUM',
      environment: 'MEDIUM',
      size: 'BIG',
      stage: 'PUPPY',
      name: 'PET_1',
      org_id: org_1.id,
      photos: [],
      requirements: [],
      independence_level: 'LOW',
    })
    await petRepository.create({
      about: '',
      energy_level: 'MEDIUM',
      environment: 'MEDIUM',
      size: 'BIG',
      stage: 'MIDDLE_AGED',
      name: 'PET_2',
      org_id: org_2.id,
      photos: [],
      requirements: [],
      independence_level: 'LOW',
    })
    await petRepository.create({
      about: '',
      energy_level: 'MEDIUM',
      environment: 'MEDIUM',
      size: 'BIG',
      stage: 'PUPPY',
      name: 'PET_3',
      org_id: org_2.id,
      photos: [],
      requirements: [],
      independence_level: 'LOW',
    })
  })


  it('should show all pets within city', async () => {
    const { pets } = await sut.execute({
      city: 'Cidade_1',
      uf: 'SC'
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({ name: 'PET_1' }),
    ])
  })

  it('should show all pets with stage filter applied', async () => {
    const { pets } = await sut.execute({
      city: 'Cidade_2',
      uf: 'RS',
      stage: 'PUPPY'
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({ stage: 'PUPPY' }),
    ])
  })
})