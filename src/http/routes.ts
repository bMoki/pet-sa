import { FastifyInstance } from "fastify"
import { createAddress } from "./controller/address"
import { createOrg } from "./controller/org"

export async function appRoutes(app: FastifyInstance) {
  app.post('/address', createAddress)
  app.post('/org', createOrg)
}

