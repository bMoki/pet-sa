
import { CreateOrgUseCase } from "./create-org";
import { compare } from "bcryptjs";
import { expect, beforeEach, describe, it } from 'vitest'
import { OrgAlreadyExistsError } from "./error/org-already-exists-error";
import { InMemoryOrgRepository } from "src/repositories/in-memory/in-memory-org-repository";
import { InMemoryAddressRepository } from "src/repositories/in-memory/in-memory-address-repository";
import { ResourceNotFound } from "./error/resource-not-found";

let orgRepository: InMemoryOrgRepository
let addressRepository: InMemoryAddressRepository
let sut: CreateOrgUseCase

describe('Create Org Use Case', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository()
    addressRepository = new InMemoryAddressRepository()
    sut = new CreateOrgUseCase(orgRepository, addressRepository)
  })

  it('should hash org password upon creation', async () => {
    const address = await addressRepository.create({
      location_id: 'location_id',
      numero: '1',
    })

    const { org } = await sut.execute({
      address_id: address.id,
      email: 'org@gmail.com',
      name: 'org',
      password: '123456',
      whatsapp: '(11)123456789'
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      org.password
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to create with an email that already exists', async () => {
    const address = await addressRepository.create({
      location_id: 'location_id',
      numero: '1',
    })

    const email = 'org@gmail.com'

    await sut.execute({
      address_id: address.id,
      email,
      name: 'org',
      password: '123456',
      whatsapp: '(11)123456789'
    })

    await expect(() =>
      sut.execute({
        address_id: address.id,
        email,
        name: 'org',
        password: '123456',
        whatsapp: '(11)123456789'
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)

  })

  it('should be able to create org', async () => {
    const address = await addressRepository.create({
      location_id: 'location_id',
      numero: '1',
    })

    const { org } = await sut.execute({
      address_id: address.id,
      email: 'org@gmail.com',
      name: 'org',
      password: '123456',
      whatsapp: '(11)123456789'
    })

    expect(org.id).toEqual(expect.any(String))
  })


  it('should not be able to create org with a nonexisting address', async () => {
    await expect(() =>
      sut.execute({
        address_id: 'address_id',
        email: 'org@gmail.com',
        name: 'org',
        password: '123456',
        whatsapp: '(11)123456789'
      }),
    ).rejects.toBeInstanceOf(ResourceNotFound)
  })
})