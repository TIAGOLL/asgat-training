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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { buscarTurmas } from '@/services/turmas';

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
export function DataTableClassrooms() {
  const [clasrooms, setClasrooms] = useState([]);
  const [loading, setLoading] = useState<boolean>();

  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
  } = useForm({});

  useEffect(() => {
    const fetchStudents = async () => {
      const result = await buscarTurmas();
      setClasrooms(result);
    };

    fetchStudents();
    console.log(clasrooms);
  }, []);

  async function updateClassroom(data) {
    setLoading(true);
    const { email, password } = data;
  }

  return (
    <div className='w-full !rounded-lg border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='font-bold'>Nome</TableHead>
            <TableHead className='font-bold'>Dia</TableHead>
            <TableHead className='font-bold'>Horarios</TableHead>
            <TableHead className='font-bold'>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clasrooms.map((classroom) => (
            <TableRow key={classroom.name}>
              <TableCell className='font-medium'>{classroom.nome}</TableCell>
              <TableCell className='font-medium'>{classroom.dia}</TableCell>
              <TableCell className='font-medium'>{classroom.horario}</TableCell>
              <TableCell className='font-medium'>
                <TooltipProvider>
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                      <span className='pt-3'>
                        <AlertDialog>
                          <AlertDialogTrigger className='m-0 rounded-md bg-green-300 p-1'>
                            <Edit className='h-4 w-4 dark:text-black' />
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <form
                              onSubmit={handleSubmit(updateClassroom)}
                              className='flex flex-col gap-6'>
                              <AlertDialogTitle>Editar senha</AlertDialogTitle>
                              <AlertDialogDescription>
                                Digite a nova senha para o usuário:{' '}
                                <span className='font-bold'></span>
                              </AlertDialogDescription>
                              <div className='grid grid-cols-2 gap-3'>
                                <div className='col-span-2 grid w-8/12 gap-1'>
                                  <Label htmlFor='email'>Email</Label>
                                  <Input type='email' {...register('email')} readOnly />
                                </div>
                                <div className='col-span-2 grid w-8/12 gap-1'>
                                  <Label htmlFor='password'>Senha</Label>
                                  <Input type='password' {...register('password')} />
                                  {errors.password && (
                                    <span className='text-sm text-red-500'></span>
                                  )}
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
                    <TooltipContent>Mudar senha</TooltipContent>
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
