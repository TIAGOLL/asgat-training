import { z } from 'zod'

import { studentSchema } from './students'

export const createClasroomSchema = z.object({
	name: z.string({ required_error: 'Nome é obrigatório' }),
	local: z.string({ required_error: 'Local é obrigatório' }),
	time: z.string({ required_error: 'Horário é obrigatório' }),
	day: z.string({ required_error: 'Dia é obrigatório' }),
	students: z.array(studentSchema).optional()
})
