import { Edit, LoaderIcon, Save } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { buscarAlunos } from '@/services/alunos';

import { FormMessageError } from '../form-message-error';
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
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Skeleton } from '../ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

export function DataTableStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [belts] = useState([
    { id: 1, name: 'Branca' },
    { id: 2, name: 'Branca com amarela' },
    { id: 3, name: 'Amarela' },
    { id: 4, name: 'Verde' },
    { id: 5, name: 'Verde com azul' },
    { id: 6, name: 'Azul' },
    { id: 7, name: 'Azul com vermelha' },
    { id: 8, name: 'Vermelha' },
    { id: 10, name: 'Vermelha com preta' },
    { id: 11, name: 'Preta' },
  ]);

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm({});

  useEffect(() => {
    setLoading(true);
    const fetchStudents = async () => {
      const result = await buscarAlunos();
      setLoading(false);
      setStudents(result);
    };

    fetchStudents();
  }, []);

  async function updateStudent(data) {}

  return (
    <div className='w-full !rounded-lg border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='font-bold'>Nome</TableHead>
            <TableHead className='font-bold'>Contato</TableHead>
            <TableHead className='font-bold'>Faixa</TableHead>
            <TableHead className='font-bold'>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading &&
            [...Array(5)].map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className='h-6' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-6' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-6' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-6' />
                </TableCell>
              </TableRow>
            ))}
          {!loading &&
            students?.map((student) => (
              <TableRow key={student?.email}>
                <TableCell className='font-medium'>{student?.nome}</TableCell>
                <TableCell>{student?.contato}</TableCell>
                <TableCell>{student?.faixa}</TableCell>
                <TableCell className='font-medium'>
                  <TooltipProvider>
                    <Tooltip delayDuration={0}>
                      <TooltipTrigger asChild>
                        <span className='pt-3'>
                          <AlertDialog>
                            <AlertDialogTrigger className='m-0 cursor-pointer rounded-md bg-green-300 p-1'>
                              <Edit className='h-4 w-4 dark:text-black' />
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <form
                                onSubmit={handleSubmit(updateStudent)}
                                className='flex flex-col gap-6'>
                                <AlertDialogTitle>Editar aluno</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Modifique os dados do aluno{' '}
                                  <span className='font-bold'>{student?.nome}</span>
                                </AlertDialogDescription>
                                <div className='grid grid-cols-2 gap-3'>
                                  <div className='col-span-2 grid w-8/12 gap-1'>
                                    <Label htmlFor='nome'>Nome</Label>
                                    <Input
                                      type='text'
                                      {...register('nome')}
                                      defaultValue={student?.nome}
                                    />
                                  </div>
                                  <div className='col-span-2 grid w-8/12 gap-1'>
                                    <Label htmlFor='contato'>Contato</Label>
                                    <Input
                                      type='text'
                                      {...register('contato')}
                                      defaultValue={student?.contato}
                                    />
                                  </div>
                                  <div className='col-span-2 grid w-8/12 gap-1'>
                                    <Label>Faixa</Label>
                                    <Select
                                      defaultValue={student?.faixa}
                                      onValueChange={(value) => setValue('faixa', value)}>
                                      <SelectTrigger {...register('faixa')} className='w-full'>
                                        <SelectValue placeholder='Selecione...' />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {belts.map((belt) => (
                                          <SelectItem key={belt.id} value={belt.name}>
                                            {belt.name}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>

                                    <FormMessageError error={errors.faixa?.message} />
                                  </div>
                                  <AlertDialogFooter className='col-span-2'>
                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction type='submit'>
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
