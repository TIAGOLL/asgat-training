import { z } from 'zod'

export const createTrainingSchema = z.object({
  type: z.string().refine((value) => {
    if (value == "") return false
    return true
  },
    {
      message: "Tipo é obrigatório",
    }
  ),
  exercises: z.array(z.string(), { required_error: "Exercícios são obrigatórios" })
})
