import { z } from "zod"

export const LoginSchema = z.object({
    nome: z.string().min(3, "O nome deve ter pelo menos 3 letras")
})
