import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { Link } from 'react-router-dom';

import { Sidebar } from '@/components/sidebar';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Classes() {
  const [activities] = useState([
    {
      id: '3',
      classe: 'Turma A',
      trainingType: 'Cardio',
      date: new Date('2025-04-01T03:00:00.000Z'),
    },
    {
      id: '4',
      classe: 'Turma A',
      trainingType: 'Cardio',
      date: new Date('2025-04-01T04:00:00.000Z'),
    },
    {
      id: '5',
      classe: 'Turma A',
      trainingType: 'Cardio',
      date: new Date('2025-04-01T05:00:00.000Z'),
    },
    {
      id: '6',
      classe: 'Turma A',
      trainingType: 'Cardio',
      date: new Date('2025-04-01T06:00:00.000Z'),
    },
    {
      id: '7',
      classe: 'Turma A',
      trainingType: 'Cardio',
      date: new Date('2025-04-01T07:00:00.000Z'),
    },
    {
      id: '8',
      classe: 'Turma A',
      trainingType: 'Cardio',
      date: new Date('2025-04-01T08:00:00.000Z'),
    },
    {
      id: '4',
      classe: 'Turma X',
      trainingType: 'Musculação',
      date: new Date('2025-04-01T09:00:00.000Z'),
    },
    {
      id: '5',
      classe: 'Turma Z',
      trainingType: 'Alongamento',
      date: new Date('2025-04-01T24:00:00.000Z'),
    },
    {
      id: '9',
      classe: 'Turma B',
      trainingType: 'Yoga',
      date: new Date('2025-04-02T10:00:00.000Z'),
    },
    {
      id: '10',
      classe: 'Turma C',
      trainingType: 'Pilates',
      date: new Date('2025-04-03T11:00:00.000Z'),
    },
    {
      id: '11',
      classe: 'Turma D',
      trainingType: 'Zumba',
      date: new Date('2025-04-04T12:00:00.000Z'),
    },
    {
      id: '12',
      classe: 'Turma E',
      trainingType: 'Crossfit',
      date: new Date('2025-04-05T13:00:00.000Z'),
    },
    {
      id: '13',
      classe: 'Turma F',
      trainingType: 'HIIT',
      date: new Date('2025-04-06T14:00:00.000Z'),
    },
    {
      id: '14',
      classe: 'Turma G',
      trainingType: 'Boxe',
      date: new Date('2025-04-07T15:00:00.000Z'),
    },
    {
      id: '15',
      classe: 'Turma H',
      trainingType: 'Dança',
      date: new Date('2025-04-08T16:00:00.000Z'),
    },
  ]);

  return (
    <div className='flex flex-row'>
      <Sidebar />
      <div className='overflow-x-auto md:min-w-[900px] lg:min-w-full'>
        <DayPicker
          className={cn(
            'mt-10 flex min-w-[1200px] items-center justify-center p-3 md:max-w-[90vw] lg:min-w-[100px]',
          )}
          classNames={{
            month: 'space-y-4',
            caption: 'flex justify-center pt-1 relative items-center',
            caption_label: 'text-xl font-medium mb-5',
            nav: 'space-x-1 flex items-center',
            nav_button: cn(
              buttonVariants({ variant: 'outline' }),
              'size-12 bg-transparent p-0 opacity-50 hover:opacity-100',
            ),
            nav_button_previous: 'absolute left-1',
            nav_button_next: 'absolute right-1',
            head: 'flex w-full mt-2',
            row: 'flex w-full mt-2 gap-2',
            cell: cn(
              '[&:has([aria-selected])]:rounded-md w-[11.29vw] h-[calc(14vh)] min-w-[150px] relative p-0 text-center text-xl focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md',
            ),
          }}
          components={{
            IconLeft(props) {
              return (
                <Button
                  variant='ghost'
                  {...props}
                  className={cn('flex size-10 items-center justify-center', props.className)}>
                  <ChevronLeft aria-label='Mês anterior' className='size-6' />
                </Button>
              );
            },
            IconRight(props) {
              return (
                <Button
                  variant='ghost'
                  {...props}
                  className={cn('flex size-10 items-center justify-center', props.className)}>
                  <ChevronRight aria-label='Próximo mês' className='size-6' />
                </Button>
              );
            },
            Day(props) {
              return (
                <div className='hover:bg-accent hover:text-accent-foreground flex h-full w-full items-center justify-end rounded-3xl border-1 font-normal'>
                  {/* Verifica se o dia no calendário é hoje, se for aplica um background no dia */}
                  {props.date.getDate() === new Date().getDate() &&
                  props.date.getMonth() === new Date().getMonth() ? (
                    <div className='absolute top-3 left-3 flex h-10 w-[6vw] items-center justify-center rounded-2xl bg-zinc-200 text-[#213046]'>
                      {props.date.getDate()}
                    </div>
                  ) : (
                    <div className='flex h-full w-[20%] items-start justify-start pt-4 pl-4'>
                      {props.date.getDate()}
                    </div>
                  )}
                  <div className='flex h-full w-[80%] flex-col items-center justify-start space-y-1 overflow-y-auto pt-2 pb-2'>
                    {activities.map(({ date, id, classe }) => {
                      if (
                        date.getDate() === props.date.getDate() &&
                        date.getMonth() === props.date.getMonth()
                      ) {
                        return (
                          <Link
                            to={`/classes/${id}`}
                            key={id}
                            className='dark:!bg-primary rounded-lg !bg-zinc-200 px-2 py-0.5 text-sm'>
                            {classe} -{' '}
                            {date.getUTCHours() +
                              ':' +
                              String(date.getUTCMinutes()).padStart(2, '0')}
                          </Link>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              );
            },
            HeadRow() {
              const weekDays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
              return (
                <div className='mb-2 flex w-full justify-between'>
                  {weekDays.map((day) => (
                    <div
                      key={day}
                      className='text-muted-foreground w-[11.29vw] min-w-[150px] text-center text-xl font-normal'>
                      {day}
                    </div>
                  ))}
                </div>
              );
            },
          }}
          mode='single'
        />
      </div>
    </div>
  );
}
