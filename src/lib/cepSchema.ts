import { z } from "zod"

export const cepSchema = z.object({
  cep: z
    .string()
    .min(8, "O CEP deve conter no minimo 8 dígitos")
    .max(8, "O CEP deve conter no maximo 8 dígitos")
    .regex(/^\d+$/, "O CEP deve conter apenas números"),
})

export type CepInput = z.infer<typeof cepSchema>
