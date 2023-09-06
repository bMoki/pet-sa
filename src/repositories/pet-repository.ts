import { Energy, Environment, IndependenceLevel, Pet, Size, Stage } from '@prisma/client'


export interface PetCreateInput {
  name: string,
  about: string,
  org_id: string,
  stage: Stage,
  energy_level: Energy,
  size: Size,
  environment: Environment,
  independence_level: IndependenceLevel,
  photos: string[]
  requirements: string[]
}

export interface FindAllPetFilter {
  stage?: Stage,
  energy_level?: Energy,
  size?: Size,
  independence_level?: IndependenceLevel,
  uf: string,
  city: string
}

export interface PetRepository {
  create(data: PetCreateInput): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  deleteById(id: string): Promise<void>
  findAll(filter: FindAllPetFilter): Promise<Pet[]>
}