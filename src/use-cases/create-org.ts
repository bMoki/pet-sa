import { OrgRepository } from "@/repositories/org-repository"
import { Org } from "@prisma/client"
import { OrgAlreadyExistsError } from "./error/org-already-exists-error"
import { hash } from "bcryptjs"
import { AddressRepository } from "@/repositories/address-repository"
import { ResourceNotFound } from "./error/resource-not-found"

interface CreateOrgUseCaseRequest {
  name: string
  email: string
  whatsapp: string
  password: string
  address_id: string
}

interface CreateOrgUseCaseResponse {
  org: Org
}

export class CreateOrgUseCase {
  constructor(
    private orgRepository: OrgRepository,
    private addressRepository: AddressRepository
  ) { }

  async execute({
    name,
    address_id,
    email,
    password,
    whatsapp
  }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const orgWithSameEmail = await this.orgRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError()
    }

    const addressExists = await this.addressRepository.findById(address_id)

    if (!addressExists) {
      throw new ResourceNotFound()
    }

    const org = await this.orgRepository.create({
      name,
      address_id,
      email,
      password: password_hash,
      whatsapp
    })

    return { org }

  }

}