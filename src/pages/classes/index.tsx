import { CalendarDays, Clock, Edit2, LogIn, NotebookTabs, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // React Router DOM

import { Loader } from '@/components/loader';
import { Sidebar } from '@/components/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { buscarAulas } from '@/services/aulas';

export function Classes() {
  const navigate = useNavigate();
  const currentDate = new Date();
  const [activities, setActivities] = useState([]);
  const [monthFilter, setMonthFilter] = useState((currentDate.getMonth() + 1).toString());
  const [yearFilter, setYearFilter] = useState(currentDate.getFullYear().toString());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchAulas = async () => {
      const result = await buscarAulas(parseInt(monthFilter));
      setActivities(result);
      setLoading(false);
    };
    fetchAulas();
  }, []);

  return (
    <div className='flex'>
      <Sidebar />

      <main className='flex-1 px-6 py-8'>
        <Card className='mb-6'>
          <CardContent className='place-items-center space-y-4 py-6'>
            <h2 className='text-lg font-semibold'>Filtrar Aulas</h2>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-6'>
              <div className='col-span-2 flex flex-col gap-2'>
                <Label>Mês</Label>
                <Input value={monthFilter} onChange={(e) => setMonthFilter(e.target.value)} />
              </div>
              <div className='col-span-2 flex flex-col gap-2'>
                <Label>Ano</Label>
                <Input value={yearFilter} onChange={(e) => setYearFilter(e.target.value)} />
              </div>
              <div className='col-span-2 flex items-end'>
                <Button className='w-full gap-2'>
                  <Search className='size-4' />
                  Pesquisar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='border-muted flex flex-wrap place-items-center gap-5 py-6 pl-6'>
            {loading && (
              <div className='flex w-full items-center justify-center'>
                <Loader className='size-10' />
              </div>
            )}

            {!loading && activities.length === 0 && (
              <p className='text-muted-foreground'>Nenhuma aula encontrada.</p>
            )}

            {!loading &&
              activities.map((event, index) => {
                const date = new Date(event.dia);
                const dateString = `${date.getDate().toString().padStart(2, '0')}/${date.getMonth().toString().padStart(2, '0')}/${date.getFullYear().toString()}`;

                return (
                  <div
                    key={index}
                    className='relative mb-10 flex w-full flex-col gap-2 rounded-lg border p-5 md:w-1/4'>
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
                      className='w-full gap-2 md:w-48'>
                      <LogIn className='h-4 w-4' />
                      Entrar na aula
                    </Button>
                    <Button variant='outline' size='sm' className='w-full gap-2 md:w-48'>
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
