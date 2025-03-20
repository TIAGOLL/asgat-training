import { z } from 'zod'

export const signInWithEmailAndPasswordSchema = z.object({
	email: z.string().email({ message: 'E-mail inválido.' }).trim(),
	password: z
		.string()
		.min(6, 'A senha deve possuir ao menos 6 caracteres.')
		.trim(),
})
