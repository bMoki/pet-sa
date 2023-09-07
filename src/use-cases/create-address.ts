import { AddressRepository } from "src/repositories/address-repository"
import { LocationRepository } from "src/repositories/location-repository"
import { Address } from "@prisma/client"

interface CreateAddressUseCaseRequest {
  cep: string
  logradouro: string
  bairro: string
  localidade: string
  uf: string
  numero: string
  complemento: string | null
}

interface CreateAddressUseCaseResponse {
  address: Address
}

export class CreateAddressUseCase {
  constructor(
    private addressRepository: AddressRepository,
    private locationRepository: LocationRepository
  ) { }

  async execute({
    cep,
    bairro,
    localidade,
    logradouro,
    uf,
    numero,
    complemento
  }: CreateAddressUseCaseRequest): Promise<CreateAddressUseCaseResponse> {

    let location = await this.locationRepository.findByCep(cep)

    if (!location) {
      location = await this.locationRepository.create({
        bairro,
        cep,
        localidade,
        logradouro,
        uf
      })
    }

    const address = await this.addressRepository.create({
      location_id: location.id,
      numero,
      complemento
    })

    return { address }

  }

}