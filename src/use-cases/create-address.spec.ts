import { InMemoryAddressRepository } from '@/repositories/in-memory/in-memory-address-repository'
import { InMemoryLocationRepository } from '@/repositories/in-memory/in-memory-location-repository'
import { expect, beforeEach, describe, it } from 'vitest'
import { CreateAddressUseCase } from './create-address'


let addressRepository: InMemoryAddressRepository
let locationRepository: InMemoryLocationRepository
let sut: CreateAddressUseCase

describe('Create Address Use Case', () => {
  beforeEach(() => {
    addressRepository = new InMemoryAddressRepository()
    locationRepository = new InMemoryLocationRepository()
    sut = new CreateAddressUseCase(addressRepository, locationRepository)
  })


  it('should be able to create address', async () => {
    const { address } = await sut.execute({
      bairro: 'Bairro',
      cep: '12345678',
      localidade: 'Cidade',
      logradouro: 'Rua',
      numero: '1',
      uf: 'SC',
    })
    expect(locationRepository.locations).toHaveLength(1)
    expect(address.id).toEqual(expect.any(String))
  })

})