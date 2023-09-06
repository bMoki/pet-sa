import { Location, Prisma } from '@prisma/client'

export interface LocationRepository {
  create(data: Prisma.LocationCreateInput): Promise<Location>
  findByCep(cep: string): Promise<Location | null>
}