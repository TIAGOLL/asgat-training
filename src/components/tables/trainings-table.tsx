import { zodResolver } from '@hookform/resolvers/zod';
import { Edit, LoaderIcon, Save } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import type { z } from 'zod';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { atualizarTreino, buscarTreinos } from '@/services/treino';

import { FormMessageError } from '../form-message-error';
import { createTrainingSchema } from '../forms/validations/create-training-schema';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Skeleton } from '../ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

type CreateTrainingSchema = z.infer<typeof createTrainingSchema>;

export function DataTableTrainings() {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    resolver: zodResolver<CreateTrainingSchema>(createTrainingSchema),
  });

  async function updateTreino(data) {
    const res = await atualizarTreino(data);
    toast.success(res);
    await buscarTreinos();
  }

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

  useEffect(() => {
    setLoading(true);
    const fetchTreinos = async () => {
      const result = await buscarTreinos();
      setLoading(false);
      setTrainings(result);
    };

    fetchTreinos();
  }, []);

  return (
    <div className='w-full !rounded-lg border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='font-bold'>ID</TableHead>
            <TableHead className='font-bold'>Tipo</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading &&
            [...Array(5)].map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className='h-6 w-32' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-6 w-24' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-6 w-16' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-6 w-12' />
                </TableCell>
              </TableRow>
            ))}
          {!loading &&
            trainings.map((training) => (
              <TableRow key={training.id}>
                <TableCell className='font-medium'>{training.id}</TableCell>
                <TableCell className='font-medium'>{training.tipo}</TableCell>
                <TableCell className='space-x-2 font-medium'>
                  <TooltipProvider>
                    <Tooltip delayDuration={0}>
                      <TooltipTrigger asChild>
                        <span className='pt-3'>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                className='h-6 w-4 cursor-pointer rounded-md bg-green-300 p-3 dark:hover:bg-green-200'
                                variant='ghost'
                                size='icon'
                                title='Editar turma'>
                                <Edit className='h-4 w-4 dark:text-black' />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <form
                                onSubmit={handleSubmit(updateTreino)}
                                className='flex flex-col gap-6'>
                                <AlertDialogTitle>Editar Treino</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Modifique os dados do aluno{' '}
                                  <span className='font-bold'>{training?.nome}</span>
                                </AlertDialogDescription>
                                <div className='grid grid-cols-2 space-y-3'>
                                  <div className='col-span-2 grid gap-1'>
                                    <Label htmlFor='nome'>Nome</Label>
                                    <Input
                                      type='text'
                                      {...register('name')}
                                      defaultValue={training?.nome}
                                    />
                                    <FormMessageError error={errors.name?.message} />
                                  </div>
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
                                  {training?.exercicios?.length > 0 && (
                                    <div className='space-y-2'>
                                      <Label>
                                        Treinos selecionados ({training?.exercicios?.length})
                                      </Label>
                                      <div className='rounded-lg border'>
                                        <Table>
                                          <TableHeader>
                                            <TableRow>
                                              <TableHead>Nome</TableHead>
                                              <TableHead>Contato</TableHead>
                                              <TableHead>Faixa</TableHead>
                                            </TableRow>
                                          </TableHeader>
                                          <TableBody>
                                            {training.exercicios.map((exercicios) => (
                                              <TableRow key={exercicios.id}>
                                                <TableCell>{exercicios.nome}</TableCell>
                                                <TableCell>{exercicios.tipo}</TableCell>
                                              </TableRow>
                                            ))}
                                          </TableBody>
                                        </Table>
                                      </div>
                                    </div>
                                  )}
                                  <AlertDialogFooter className='col-span-2'>
                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction type='submit' onClick={() => {}}>
                                      {loading ? (
                                        <LoaderIcon className='mr-2 h-4 w-4 animate-spin dark:text-black' />
                                      ) : (
                                        <Save className='mr-2 h-4 w-4 dark:text-black' />
                                      )}
                                      Salvar
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </div>
                              </form>
                            </AlertDialogContent>
                          </AlertDialog>
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>Editar aluno</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
