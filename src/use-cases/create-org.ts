import { OrgRepository } from "@/repositories/org-repository"
import { Org } from "@prisma/client"
import { OrgAlreadyExistsError } from "./error/org-already-exists-error"
import { hash } from "bcryptjs"

interface CreateOrgUseCaseRequest {
  name: string
  email: string
  cep: string
  address: string
  whatsapp: string
  password: string
}

interface CreateOrgUseCaseResponse {
  org: Org
}

export class CreateOrgUseCase {
  constructor(private orgRepository: OrgRepository) { }

  async execute({
    name,
    address,
    cep,
    email,
    password,
    whatsapp
  }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const orgWithSameEmail = await this.orgRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError()
    }

    const org = await this.orgRepository.create({
      name,
      address,
      cep,
      email,
      password: password_hash,
      whatsapp
    })

    return { org }

  }

}