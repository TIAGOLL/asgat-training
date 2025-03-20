import { zodResolver } from '@hookform/resolvers/zod'
import { HTTPError } from 'ky'
import nookies from 'nookies'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { z } from 'zod'

import { FormMessageError } from '@/components/form-message-error'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader } from '@/components/loader'
import { signInWithEmailAndPasswordSchema } from '@/forms/validations/sign-in-with-email-and-password'
import { SignInWithEmailAndPasswordService } from '@/services/sign-in-with-email-and-password.service'
import { KeyRound, LogIn, Mail, ShieldCheck, ShieldX } from 'lucide-react'

type SignInWithEmailAndPasswordSchema = z.infer<
	typeof signInWithEmailAndPasswordSchema
>

export function SignInWithEmailAndPasswordForm() {
	const navigate = useNavigate()
	const [loading, setLoading] = useState<boolean>(false)

	const {
		handleSubmit,
		formState: { errors },
		register,
	} = useForm<SignInWithEmailAndPasswordSchema>({
		resolver: zodResolver(signInWithEmailAndPasswordSchema),
	})

	async function signInWithEmailAndPassword({
		email,
		password,
	}: SignInWithEmailAndPasswordSchema) {
		setLoading(true)
		try {
			const { token, message } = await SignInWithEmailAndPasswordService({
				email,
				password,
			})

			if (token) {
				nookies.set(null, 'token', token, { maxAge: 60 * 60 * 24, path: '/' })
				toast.success(message, {
					icon: ShieldCheck,
				})
				navigate('/classes')
			}
		}

		catch (error) {
			if (error instanceof HTTPError) {
				const { message } = await error.response.json()

				return toast.error(message, {
					icon: ShieldX,
				})
			}
		}

		finally {
			setLoading(false)
		}
	}

	return (
		<form
			onSubmit={handleSubmit(signInWithEmailAndPassword)}
			className='grid gap-4'
		>
			<div className='grid gap-2'>
				<Label htmlFor='email' className='flex place-items-center gap-2'>
					<Mail className='size-4' />
					E-mail
				</Label>
				<Input
					autoFocus
					id='email'
					{...register('email')}
					autoComplete='off'
					defaultValue='john.doe@acme.com'
				/>
				<FormMessageError error={errors.email?.message} />
			</div>
			<div className='grid gap-2'>
				<div className='flex items-center'>
					<Label htmlFor='password' className='flex place-items-center gap-2'>
						<KeyRound className='size-4' />
						Senha
					</Label>
				</div>
				<Input
					id='password'
					type='password'
					autoComplete='off'
					placeholder='123456'
					{...register('password')}
				/>
				<FormMessageError error={errors.password?.message} />
			</div>
			<Button className='w-full' disabled={loading}>
				Logar
				{loading && <Loader className='size-4 animate-spin' />}
				{!loading && <LogIn className='size-4' />}
			</Button>
			<Button className='w-full' onClick={() => navigate('/classes')} disabled={loading}>
				teste
			</Button>
		</form>
	)
}