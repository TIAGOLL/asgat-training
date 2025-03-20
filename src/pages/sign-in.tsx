import { NavLink } from 'react-router-dom'
import { KeyRound } from 'lucide-react'
import { ThemeSwitcher } from '@/components/ui/theme-switcher'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { SignInWithEmailAndPasswordForm } from '@/forms/sign-in-with-email-and-password-form'

export function SignIn() {
  return (
    <div className='flex h-screen w-full justify-center items-center flex-col px-4 bg-gradient-to-br from-slate-400 to-slate-900 dark:to-black'>
      <div className='absolute bottom-32 left-32'>
        <ThemeSwitcher />
      </div>
      <img src="logo.png" alt="Logo Asgat" width={150} className='mb-10' />
      <Card className='mx-auto max-w-sm border-4 border-gray-500'>
        <CardHeader>
          <CardTitle className='flex place-items-center gap-2 text-2xl'>
            <KeyRound />
            Autenticação
          </CardTitle>
          <CardDescription>
            Insira seu e-mail e senha abaixo para fazer login em sua conta!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignInWithEmailAndPasswordForm />
          <div className='mt-8 flex items-center justify-around text-center text-sm'>
            <NavLink to='/auth/sign-up' className='underline'>
              Não possuo conta
            </NavLink>
            <NavLink
              to='/auth/forgot-password'
              className='ml-auto inline-block text-sm underline'
            >
              Esqueci minha senha
            </NavLink>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}