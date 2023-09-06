import { Energy, Environment, Pet, Size, Stage } from '@prisma/client'


export interface PetCreateInput {
  name: string,
  about: string,
  org_id: string,
  stage: Stage,
  energy_level: Energy,
  size: Size,
  environment: Environment,
  photos: string[]
  requirements: string[]
}

export interface PetRepository {
  create(data: PetCreateInput): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  deleteById(id: string): Promise<void>
  //findAllInCity(address: string): Promise<Pet[]>
}