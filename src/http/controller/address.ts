import { makeCreateAddressUseCase } from "@/use-cases/factories/make-create-address-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createAddress(request: FastifyRequest, reply: FastifyReply) {
  const createAddressBodySchema = z.object({
    cep: z.string().length(8, "O CEP requer 8 dígitos!"),
    logradouro: z.string(),
    bairro: z.string(),
    localidade: z.string(),
    uf: z.string().length(2, "A UF requer 2 dígitos"),
    numero: z.string().min(1),
    complemento: z.string().nullable().default(null)
  })

  const {
    bairro,
    cep,
    complemento,
    localidade,
    logradouro,
    numero,
    uf
  } = createAddressBodySchema.parse(request.body)

  try {
    const createAddressUseCase = makeCreateAddressUseCase()

    await createAddressUseCase.execute({
      bairro,
      cep,
      complemento,
      localidade,
      logradouro,
      numero,
      uf
    })

  } catch (err) {

    throw err
  }
  return reply.status(201).send();
}