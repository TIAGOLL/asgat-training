import { zodResolver } from '@hookform/resolvers/zod';
import { Save } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';

import { FormMessageError } from '@/components/form-message-error';
import { updateClassesSchema } from '@/components/forms/validations/update-classroom-schema';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type UpdateClassesSchema = z.infer<typeof updateClassesSchema>;

export function UpdateClassesForm() {
  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
  } = useForm({
    defaultValues: {
      classroom: '1',
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      training: '1',
    },
    resolver: zodResolver(updateClassesSchema),
  });

  const { id } = useParams();

  const navigate = useNavigate();

  const [classrooms] = useState([
    { id: '1', name: 'Sala 1' },
    { id: '2', name: 'Sala 2' },
    { id: '3', name: 'Sala 3' },
    { id: '4', name: 'Sala 4' },
    { id: '5', name: 'Sala 5' },
    { id: '6', name: 'Sala 6' },
    { id: '7', name: 'Sala 7' },
    { id: '8', name: 'Sala 8' },
    { id: '9', name: 'Sala 9' },
    { id: '10', name: 'Sala 10' },
  ]);

  const [trainings] = useState([
    { id: '1', name: 'Treino 1' },
    { id: '2', name: 'Treino 2' },
    { id: '3', name: 'Treino 3' },
    { id: '4', name: 'Treino 4' },
    { id: '5', name: 'Treino 5' },
    { id: '6', name: 'Treino 6' },
    { id: '7', name: 'Treino 7' },
    { id: '8', name: 'Treino 8' },
    { id: '9', name: 'Treino 9' },
    { id: '10', name: 'Treino 10' },
  ]);

  async function updateClasses({ classroom, date, time, training }: UpdateClassesSchema) {
    console.log('updateClasses', { classroom, date, time, training });
    return navigate(`/classes/attendance-list/${id}`);
  }

  return (
    <form
      onSubmit={handleSubmit(updateClasses)}
      className='grid w-full grid-cols-6 place-items-center gap-4'>
      <Card className='col-span-6 w-11/12 gap-2'>
        <CardHeader className='col-span-6 place-items-center'>
          <CardTitle>Manipular aulas</CardTitle>
        </CardHeader>
        <CardContent className='col-span-6 mt-10 grid grid-cols-6 gap-2'>
          <div className='col-span-6 grid gap-2'>
            <Label>Turma</Label>
            <Select onValueChange={(value) => setValue('classroom', value)}>
              <SelectTrigger {...register('classroom')} className='w-full'>
                <SelectValue placeholder='Selecione...' />
              </SelectTrigger>
              <SelectContent>
                {classrooms.map((classroom) => (
                  <SelectItem key={classroom.id} value={classroom.id}>
                    {classroom.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessageError error={errors.classroom?.message} />
          </div>
          <div className='col-span-6 grid gap-2'>
            <Label>Treino</Label>
            <Select onValueChange={(value) => setValue('training', value)}>
              <SelectTrigger {...register('training')} className='w-full'>
                <SelectValue placeholder='Selecione...' />
              </SelectTrigger>
              <SelectContent>
                {trainings.map((training) => (
                  <SelectItem key={training.id} value={training.id}>
                    {training.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessageError error={errors.training?.message} />
          </div>
          <div className='col-span-6 grid gap-2'>
            <Label htmlFor='date'>Data</Label>
            <Input id='date' type='date' {...register('date')} />
            <FormMessageError error={errors.date?.message} />
          </div>
          <div className='col-span-6 grid gap-2'>
            <Label htmlFor='time'>Horário</Label>
            <Input id='time' {...register('time')} type='time' />
            <FormMessageError error={errors.time?.message} />
          </div>
        </CardContent>
      </Card>
      <div className='col-span-6 mt-6 grid place-items-center gap-4'>
        <Button type='submit' className='w-[10rem] gap-2'>
          <Save className='size-4' />
          Próximo
        </Button>
      </div>
    </form>
  );
}
