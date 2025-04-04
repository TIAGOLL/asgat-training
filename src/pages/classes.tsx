import { ChevronLeft, ChevronRight } from 'lucide-react'
import { DayPicker } from 'react-day-picker'

import { Sidebar } from '@/components/sidebar'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function Classes() {
	return (
		<div className='flex flex-row'>
			<Sidebar />
			<div className='flex w-full flex-col items-center justify-start'>
				<h1>Aulas</h1>
				<div className='flex flex-row items-center justify-center space-x-4'>
					<DayPicker
						className={cn('flex items-center justify-center p-3')}
						classNames={{
							months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
							month: 'space-y-4',
							caption: 'flex justify-center pt-1 relative items-center',
							caption_label: 'text-xl font-medium mb-5',
							nav: 'space-x-1 flex items-center',
							nav_button: cn(
								buttonVariants({ variant: 'outline' }),
								'size-12 bg-transparent p-0 opacity-50 hover:opacity-100'
							),
							nav_button_previous: 'absolute left-1',
							nav_button_next: 'absolute right-1',
							table: 'w-full border-collapse space-y-1 max-w-none flex flex-col justify-center items-center',
							head: 'flex w-full mt-2',
							head_cell: 'text-muted-foreground rounded-md w-[calc(14.29vw-3rem)] font-normal text-xl',
							row: 'flex w-full mt-2 gap-2',
							cell: cn(
								'[&:has([aria-selected])]:rounded-md w-[calc(14.29vw-3rem)] h-[calc(10vh)] relative p-0 text-center text-xl focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md'
							),
							day: cn(
								buttonVariants({ variant: 'ghost' }),
								'h-20 w-20 p-4 flex items-start justify-center font-normal aria-selected:opacity-100 m-auto'
							),

							day_range_start: 'day-range-start',
							day_range_end: 'day-range-end',
							day_selected:
								'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
							day_today: 'bg-accent text-accent-foreground',
							day_outside:
								'day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground',
							day_disabled: 'text-muted-foreground opacity-50',
							day_range_middle: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
							day_hidden: 'invisible'
						}}
						components={{
							IconLeft(props) {
								return (
									<Button
										variant='ghost'
										{...props}
										className={cn('flex size-10 items-center justify-center', props.className)}
									>
										<ChevronLeft aria-label='Mês anterior' className='size-6' />
									</Button>
								)
							},
							IconRight(props) {
								return (
									<Button
										variant='ghost'
										{...props}
										className={cn('flex size-10 items-center justify-center', props.className)}
									>
										<ChevronRight aria-label='Próximo mês' className='size-6' />
									</Button>
								)
							},
							Day(props) {
								return (
									<button
										type='button'
										{...props}
										className={cn(
											'hover:bg-accent hover:text-accent-foreground flex h-full w-full items-center justify-center rounded-3xl border-1 font-normal'
										)}
									>
										<div className='flex h-full w-full'>
											<div className='flex h-full w-[20%] items-start justify-start pt-4 pl-4'>
												{props.date.getDate()}
											</div>
											<div className='flex h-full w-[80%] items-center justify-center'>
												{/* LISTAR ATIVIDADES */}
											</div>
										</div>
									</button>
								)
							},
							HeadRow() {
								const weekDays = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo']
								return (
									<thead className='rdp-head'>
										{weekDays.map((day) => (
											<th
												scope='col'
												key={day}
												className='text-muted-foreground w-[calc(14.29vw-3rem)] rounded-md text-xl font-normal'
												aria-label='Sunday'
											>
												{day}
											</th>
										))}
									</thead>
								)
							}
						}}
						mode='single'
					/>
				</div>
			</div>
		</div>
	)
}
