import { api } from './api-client.service'

interface SignInWithEmailAndPasswordRequest {
	email: string
	password: string
}

interface SignInWithEmailAndPasswordResponse {
	token: string
	message: string
}

export async function SignInWithEmailAndPasswordService({
	email,
	password,
}: SignInWithEmailAndPasswordRequest) {
	const result = await api
		.post('sessions/password', {
			json: {
				email,
				password,
			},
		})
		.json<SignInWithEmailAndPasswordResponse>()

	return result
}
