import { OrgAlreadyExistsError } from "@/use-cases/error/org-already-exists-error";
import { ResourceNotFound } from "@/use-cases/error/resource-not-found";
import { makeCreateOrgUseCase } from "@/use-cases/factories/make-create-org-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createOrg(request: FastifyRequest, reply: FastifyReply) {
  const createOrgBodySchema = z.object({
    address_id: z.string().uuid(),
    email: z.string().email("Email inválido"),
    name: z.string().min(4, "O nome deve ter no mínimo 4 caracteres"),
    password: z.string().min(4, "A senha deve ter no mínimo 4 caracteres"),
    whatsapp: z.string().length(11, "Número inválido")
  })

  const {
    address_id,
    email,
    name,
    password,
    whatsapp,
  } = createOrgBodySchema.parse(request.body)

  try {
    const createOrgUseCase = makeCreateOrgUseCase()

    await createOrgUseCase.execute({
      address_id,
      email,
      name,
      password,
      whatsapp,
    })

  } catch (err) {
    if (err instanceof ResourceNotFound) {
      return reply.status(400).send()
    }
    if (err instanceof OrgAlreadyExistsError) {
      return reply.status(409).send()
    }
  }

  return reply.status(201).send()
}