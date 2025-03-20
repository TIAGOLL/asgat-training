import { z } from 'zod'

export const signUpWithEmailAndPasswordSchema = z.object({
	name: z.string().min(2, 'Nome inválido').trim(),
	email: z.string().email({ message: 'E-mail inválido.' }).trim(),
	password: z
		.string()
		.min(6, 'A senha deve possuir ao menos 6 caracteres.')
		.trim(),
})
