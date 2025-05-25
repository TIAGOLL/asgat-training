import { zodResolver } from '@hookform/resolvers/zod';
import { PlusCircle, Save } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import type { z } from 'zod';

import { Loader } from '@/components/loader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { criarTreino } from '@/services/treino';

import { FormMessageError } from '../../../components/form-message-error';
import { createTrainingSchema } from '../../../components/forms/validations/create-training-schema';

type CreateTrainingSchema = z.infer<typeof createTrainingSchema>;

export function CreateTrainingForm() {
  const [exercisesList, setExercisesList] = useState<string[]>([]);
  const navigate = useNavigate();

  const [trainingTypes] = useState([
    {
      id: 'forca',
      name: 'Treino de força',
    },
    {
      id: 'resistencia',
      name: 'Treino de resistência',
    },
    {
      id: 'controle',
      name: 'Treino de controle',
    },
  ]);

  const [exercise, setExercise] = useState('');
  const [loading, setLoading] = useState<boolean>();

  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
    setError,
    clearErrors,
  } = useForm<CreateTrainingSchema>({
    resolver: zodResolver(createTrainingSchema),
  });

  async function createTraining({ type, exercises }: CreateTrainingSchema) {
    setLoading(true);
    const res = await criarTreino({ treino: type, exercicios: exercisesList });
    toast.success(res);
    setLoading(false);
    navigate('/trainings');
  }

  return (
    <form
      onSubmit={handleSubmit(createTraining)}
      className='grid w-full grid-cols-6 place-items-center gap-4'>
      <Card className='col-span-6 w-11/12 gap-2'>
        <CardHeader className='flex flex-col items-center justify-center'>
          <CardTitle>Cadastrar treino</CardTitle>
          <CardDescription>Crie treinos para aplicar aos alunos</CardDescription>
        </CardHeader>
        <CardContent className='mt-10 grid grid-cols-6 space-y-7'>
          <div className='col-span-6 grid gap-2'>
            <Label>Tipo de treino</Label>
            <Select onValueChange={(value) => setValue('type', value)}>
              <SelectTrigger {...register('type')} className='w-full'>
                <SelectValue placeholder='Selecione...' />
              </SelectTrigger>
              <SelectContent>
                {trainingTypes.map((training) => (
                  <SelectItem key={training.id} value={training.id}>
                    {training.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessageError error={errors.type?.message} />
          </div>
          <div className='col-span-6 grid gap-2'>
            <Label htmlFor='training'>Exercícios</Label>
            <Input
              id='training'
              placeholder='Flexões - 10 repetições'
              onChange={(e) => setExercise(e.target.value)}
              value={exercise}
            />
          </div>
          <div className='col-span-6 grid gap-2'>
            <FormMessageError error={errors.exercises?.message} />
          </div>
          <div className='col-span-6 grid gap-2'>
            <Button
              type='button'
              className='w-full'
              onClick={() => {
                if (exercise.length < 3) {
                  return setError('exercises', {
                    message: 'O treino não pode ter menos que 3 caracteres',
                    type: 'minLength',
                  });
                }

                if (exercise.length >= 3) {
                  clearErrors('exercises');
                  setExercisesList((prev) => {
                    return [...prev, exercise];
                  });
                  setValue('exercises', exercisesList);
                  setExercise('');
                }
              }}>
              <PlusCircle />
              Adicionar
            </Button>
          </div>
          <div className='col-span-6 gap-2'>
            <Table className='col-span-6'>
              <TableHeader></TableHeader>
              <TableBody>
                {exercisesList.map((exercise) => (
                  <TableRow key={exercise}>
                    <TableCell>{exercise}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Total de exercícios</TableCell>
                  <TableCell className='text-right'>{exercisesList.length}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </CardContent>
      </Card>
      <div className='col-span-6 mt-6 grid place-items-center gap-4'>
        <Button type='submit' className='w-[10rem] gap-2' disabled={loading}>
          {loading && <Loader className='size-4' />}
          {!loading && <Save className='size-4' />}
          Salvar
        </Button>
      </div>
    </form>
  );
}
