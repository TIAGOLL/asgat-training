import ky from 'ky'
import nookies from 'nookies'
import { redirect } from 'react-router-dom'

export const api = ky.create({
	prefixUrl: process.env.API_URL,
	hooks: {
		beforeRequest: [
			async (request) => {
				const cookies = nookies.get()
				const token = cookies.token

				if (!token && !window.location.href.includes('auth')) {
					redirect('/auth/sign-in')
				}

				request.headers.set('Authorization', `Bearer ${token}`)
			},
		],
		afterResponse: [
			(_request, _options, response) => {
				if (response.status === 401 && !window.location.href.includes('auth')) {
					nookies.destroy(null, 'token')
					window.location.href = '/auth/sign-in'
				}
			},
		],
	},
})