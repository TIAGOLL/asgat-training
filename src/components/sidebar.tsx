import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Circle, Clipboard, Dumbbell, GraduationCap, Power, Users } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

export function Sidebar() {
	type Tab = {
		name: string;
		icon: React.ElementType;
		links: {
			name: string;
			to: string;
		}[];
	};

	const tabs: Tab[] = [
		{
			name: 'Aulas',
			icon: GraduationCap,
			links: [
				{ name: 'Ver aulas', to: '/classes' },
				{ name: 'Cadastrar aulas', to: '/classes/register' }
			]
		},
		{
			name: 'Alunos',
			icon: Users,
			links: [
				{ name: 'Ver alunos', to: '/students' },
				{ name: 'Cadastrar alunos', to: '/students/register' }
			]
		},
		{
			name: 'Turmas',
			icon: Clipboard,
			links: [
				{ name: 'Ver turmas', to: '/classrooms' },
				{ name: 'Cadastrar turma', to: '/classrooms/register' }
			]
		},
		{
			name: 'Treinos',
			icon: Dumbbell,
			links: [
				{ name: 'Ver treinos', to: '/trainings' },
				{ name: 'Cadastrar treino', to: '/trainings/register' }
			]
		}
	]

	return (
		<div className='flex h-screen w-[17rem] flex-col bg-indigo-600 p-4 text-white'>
			<div className='flex flex-col items-center space-y-3'>
				<Avatar className='h-15 w-15'>
					<AvatarImage src='logo.png' />
					<AvatarFallback>ASGAT</AvatarFallback>
				</Avatar>
				<h2 className='font-serif text-xl font-semibold'>ASGAT</h2>
			</div>
			<nav className='flex flex-1 flex-col justify-between'>
				<Accordion type='single' collapsible className='mt-10 flex w-full flex-col gap-3'>
					{tabs.map((tab) => {
						const active = window.location.pathname === tab.links[0].to || window.location.pathname === tab.links[1].to

						return (
							<AccordionItem value={tab.name} className='flex flex-col gap-2 border-0' key={tab.name}>
								<AccordionTrigger
									className={`flex cursor-pointer items-center space-x-3 rounded-lg p-2 !no-underline duration-400 ${active ? '!bg-white font-semibold text-indigo-600' : 'hover:bg-indigo-500'}`}
								>
									<tab.icon className='size-6 !rotate-none animate-none' />
									<span className='text-lg'>{tab.name}</span>
								</AccordionTrigger>
								<AccordionContent className='animate-in fade-in-50 slide-in-from-top-10 data-[state=open]:animate-out data-[state=closed]:fade-out-50 data-[state=closed]:slide-out-to-bottom-10 m-0 flex flex-col space-y-1 border-0 py-0.5'>
									{tab.links.map((link) => {
										return (
											<NavLink
												to={link.to}
												className='flex flex-row items-center gap-2 text-lg hover:underline'
												key={link.name}
											>
												<Circle className='size-2' />
												{link.name}
											</NavLink>
										)
									})}
								</AccordionContent>
							</AccordionItem>
						)
					})}
				</Accordion>
				<Link rel='stylesheet' to='/'>
					<Button
						variant='destructive'
						type='button'
						className='flex w-[10rem] place-items-center space-x-2 hover:cursor-pointer'
					>
						<Power />
						Sair
					</Button>
				</Link>
			</nav>
		</div>
	)
}
