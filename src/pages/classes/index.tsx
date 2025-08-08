import { CalendarDays, Clock, Edit2, LogIn, NotebookTabs } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // React Router DOM

import { Sidebar } from '@/components/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { buscarAulas } from '@/services/aulas';

export function Classes() {
  const navigate = useNavigate();
  const currentDate = new Date();
  const [activities, setActivities] = useState([]);
  const [monthFilter, setMonthFilter] = useState((currentDate.getMonth() + 1).toString());
  const [yearFilter, setYearFilter] = useState(currentDate.getFullYear().toString());
  const [loading, setLoading] = useState(true);
  const [showFinished, setShowFinished] = useState<boolean>(false);

  useEffect(() => {
    console.log(showFinished);
    setLoading(true);
    if (
      !monthFilter ||
      !yearFilter ||
      isNaN(parseInt(monthFilter)) ||
      isNaN(parseInt(yearFilter)) ||
      parseInt(monthFilter) < 0 ||
      parseInt(monthFilter) > 12 ||
      yearFilter.length !== 4
    ) {
      setLoading(false);
      return;
    }
    const fetchAulas = async () => {
      const result = await buscarAulas(parseInt(monthFilter), parseInt(yearFilter), showFinished);
      setActivities(result);
      setLoading(false);
    };
    fetchAulas();
  }, [monthFilter, yearFilter, showFinished]);

  return (
    <div className='flex'>
      <Sidebar />
      <main className='mx-6 mt-5 flex-1 py-8'>
        <Card className='mb-6'>
          <CardContent className='place-items-center space-y-4'>
            <CardTitle className='text-lg font-semibold'>Filtrar Aulas</CardTitle>
            <CardDescription className='text-muted-foreground text-sm'>
              Para filtrar somente pelo ano, deixe o campo do mês em branco.
            </CardDescription>
            <div className='grid grid-cols-5 gap-4'>
              <div className='col-span-2 grid gap-2'>
                <Label>Mês</Label>
                <Input
                  value={monthFilter}
                  onChange={(e) => setMonthFilter(e.target.value)}
                  maxLength={2}
                />
                {!monthFilter ? (
                  <p className='text-sm text-red-500'>Por favor, insira um mês válido.</p>
                ) : isNaN(parseInt(monthFilter)) ||
                  parseInt(monthFilter) < 0 ||
                  parseInt(monthFilter) > 12 ? (
                  <p className='text-sm text-red-500'>Mês inválido. Deve ser entre 1 e 12.</p>
                ) : null}
              </div>
              <div className='col-span-2 grid gap-2'>
                <Label>Ano (AAAA)</Label>
                <Input
                  value={yearFilter}
                  onChange={(e) => setYearFilter(e.target.value)}
                  placeholder='AAAA'
                  maxLength={4}
                />
                {!yearFilter || yearFilter.length === 0 ? (
                  <p className='text-sm text-red-500'>Por favor, insira um ano válido.</p>
                ) : yearFilter.length !== 4 || isNaN(parseInt(yearFilter)) ? (
                  <p className='text-sm text-red-500'>Ano inválido. Deve ter 4 dígitos.</p>
                ) : null}
              </div>
              <div className='col-span-2 flex gap-2'>
                <Input
                  className='size-10 sm:size-6 md:size-6'
                  onChange={(e) => setShowFinished(e.target.checked)}
                  type='checkbox'
                />
                <Label>Mostrar somente aulas finalizadas</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className='border-0 md:border-1'>
          <CardContent className='border-muted flex flex-wrap items-center justify-center p-0 md:gap-5'>
            {loading &&
              Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={idx}
                  className='relative mb-10 flex w-full flex-col gap-2 rounded-lg border p-5 md:w-2/9'>
                  <div className='flex items-center gap-1 font-bold'>
                    <Skeleton className='h-4 w-4 rounded-full' />
                    <Skeleton className='h-4 w-24' />
                  </div>
                  <Skeleton className='h-6 w-32 rounded' />
                  <div className='text-muted-foreground mb-2 flex flex-col gap-2 text-sm'>
                    <div className='flex items-center gap-1'>
                      <Skeleton className='h-4 w-4 rounded-full' />
                      <Skeleton className='h-4 w-20' />
                    </div>
                    <div className='flex items-center gap-1'>
                      <Skeleton className='h-4 w-4 rounded-full' />
                      <Skeleton className='h-4 w-16' />
                    </div>
                  </div>
                  <Skeleton className='h-8 w-full rounded md:w-48' />
                  <Skeleton className='h-8 w-full rounded md:w-48' />
                </div>
              ))}
            {!loading &&
              activities.map((event, index) => {
                const date = new Date(event.dia);
                date.setDate(date.getDate() + 1);
                const dateString = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;

                return (
                  <div
                    key={index}
                    className='relative mb-10 flex w-full flex-col gap-2 rounded-lg border p-5 md:w-3/9'>
                    <div className='flex items-center gap-1 font-bold'>
                      <CalendarDays className='h-4 w-4' />
                      {dateString}
                    </div>
                    <p
                      className={`text-base font-semibold ${event.active ? 'text-primary' : 'text-foreground'}`}>
                      {event.title}
                    </p>
                    <div className='text-muted-foreground mb-2 flex flex-col gap-2 text-sm'>
                      <div className='flex items-center gap-1'>
                        <NotebookTabs className='h-4 w-4' />
                        {event.nome}
                      </div>
                      <div className='flex items-center gap-1'>
                        <Clock className='h-4 w-4' />
                        {event.horario}
                      </div>
                    </div>
                    <Button
                      variant='secondary'
                      size='sm'
                      onClick={() => navigate(`/classes/attendance-list/${event.id}`)}
                      className='w-full max-w-full gap-2 md:w-48'>
                      <LogIn className='h-4 w-4' />
                      Entrar na aula
                    </Button>
                    <Button variant='outline' size='sm' className='w-full max-w-full gap-2 md:w-48'>
                      <Edit2 className='h-4 w-4' />
                      Editar aula
                    </Button>
                  </div>
                );
              })}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
