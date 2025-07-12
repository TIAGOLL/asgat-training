import { zodResolver } from '@hookform/resolvers/zod';
import { Check, ChevronsUpDown, Edit, LoaderIcon, Save } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import type { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
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
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { buscarAlunos } from '@/services/alunos';
import { atualizarTurma, buscarTurma, buscarTurmas } from '@/services/turmas';

import { FormMessageError } from '../../components/form-message-error';
import { createClasroomSchema } from '../../components/forms/validations/create-classroom-schema';
import { studentSchema } from '../../components/forms/validations/entities/students';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Skeleton } from '../ui/skeleton';

type CreateClasroomSchema = z.infer<typeof createClasroomSchema>;
type StudentSchema = z.infer<typeof studentSchema>;

export function DataTableClassrooms() {
  const [clasrooms, setClasrooms] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editingClassroom, setEditingClassroom] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [studentsList, setStudentsList] = useState<StudentSchema[]>([]);
  const [selectedStudents, setSelectedStudents] = useState<StudentSchema[]>([]);
  const [updateLoading, setUpdateLoading] = useState(false);

  const days = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
    reset,
    watch,
  } = useForm<CreateClasroomSchema>({
    resolver: zodResolver(createClasroomSchema),
  });

  useEffect(() => {
    setLoading(true);
    const fetchStudents = async () => {
      const result = await buscarTurmas();
      setLoading(false);
      setClasrooms(result);
    };
    fetchStudents();
  }, []);

  useEffect(() => {
    const fetchStudents = async () => {
      const result = await buscarAlunos();
      setStudentsList(result);
    };
    fetchStudents();
  }, []);

  const handleEditClick = async (classroom) => {
    try {
      setUpdateLoading(true);

      console.log(classroom.id);
      const fullClassroomData = await buscarTurma(classroom.id);
      console.log(fullClassroomData);
      setEditingClassroom(fullClassroomData);
      setSelectedStudents(fullClassroomData.alunos || []);

      reset({
        name: fullClassroomData.nome,
        local: fullClassroomData.local,
        day: fullClassroomData.dia.trim(),
        time: fullClassroomData.horario,
      });

      setValue('name', fullClassroomData.nome);
      setValue('local', fullClassroomData.local);
      setValue('day', fullClassroomData.dia.trim());
      setValue('time', fullClassroomData.horario);

      setIsEditDialogOpen(true);
    } catch (error) {
      console.error('Erro ao buscar dados da turma:', error);
      toast.error('Erro ao carregar dados da turma');
    } finally {
      setUpdateLoading(false);
    }
  };

  async function updateClassroom(data: CreateClasroomSchema) {
    if (!editingClassroom) return;

    setUpdateLoading(true);
    try {
      await atualizarTurma({
        id: editingClassroom.id,
        nome: data.name,
        local: data.local,
        dia: data.day,
        horario: data.time,
        alunos: selectedStudents,
      });

      toast.success('Turma atualizada com sucesso!');

      // Atualiza a lista de turmas
      const updatedClassrooms = clasrooms.map((classroom) =>
        classroom.id === editingClassroom.id
          ? {
              ...classroom,
              ...data,
              nome: data.name,
              dia: data.day,
              horario: data.time,
              alunos: selectedStudents,
            }
          : classroom,
      );
      setClasrooms(updatedClassrooms);

      setIsEditDialogOpen(false);
      setEditingClassroom(null);
      setSelectedStudents([]);
      reset();
    } catch (error) {
      toast.error('Erro ao atualizar turma');
    } finally {
      setUpdateLoading(false);
    }
  }

  const handleCloseDialog = () => {
    setIsEditDialogOpen(false);
    setEditingClassroom(null);
    setSelectedStudents([]);
    reset();
  };

  return (
    <>
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
              clasrooms.map((classroom) => (
                <TableRow key={classroom.id || classroom.nome}>
                  <TableCell className='font-medium'>{classroom.nome}</TableCell>
                  <TableCell className='font-medium'>{classroom.dia}</TableCell>
                  <TableCell className='font-medium'>{classroom.horario}</TableCell>
                  <TableCell className='font-medium'>
                    <TooltipProvider>
                      <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                          <Button
                            variant='ghost'
                            size='sm'
                            onClick={() => handleEditClick(classroom)}
                            className='h-8 w-8 p-0'>
                            <Edit className='h-4 w-4' />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Editar turma</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      {/* Dialog de Edição */}
      <AlertDialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <AlertDialogContent className='max-h-[90vh] max-w-4xl overflow-y-auto'>
          <AlertDialogTitle>Editar Turma</AlertDialogTitle>
          <AlertDialogDescription>
            Modifique as informações da turma {editingClassroom?.nome}
          </AlertDialogDescription>

          <form onSubmit={handleSubmit(updateClassroom)} className='space-y-4'>
            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='edit-name'>Nome da turma</Label>
                <Input id='edit-name' {...register('name')} />
                <FormMessageError error={errors.name?.message} />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='edit-local'>Local</Label>
                <Input id='edit-local' {...register('local')} />
                <FormMessageError error={errors.local?.message} />
              </div>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label>Dia da semana</Label>
                <Select onValueChange={(value) => setValue('day', value)} value={watch('day')}>
                  <SelectTrigger {...register('day')}>
                    <SelectValue placeholder='Selecione...' />
                  </SelectTrigger>
                  <SelectContent>
                    {days.map((day) => (
                      <SelectItem key={day} value={day}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessageError error={errors.day?.message} />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='edit-time'>Horário</Label>
                <Input type='time' id='edit-time' {...register('time')} />
                <FormMessageError error={errors.time?.message} />
              </div>
            </div>

            <div className='space-y-2'>
              <Label>Alunos</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant='outline' role='combobox' className='w-full justify-between'>
                    Selecione os alunos...
                    <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-full p-0'>
                  <Command>
                    <CommandInput placeholder='Pesquise...' />
                    <CommandList>
                      <CommandEmpty>Aluno não encontrado.</CommandEmpty>
                      <CommandGroup>
                        {studentsList.map((student) => (
                          <CommandItem
                            key={student.id}
                            value={student.nome}
                            onSelect={() => {
                              setSelectedStudents((prev) => {
                                const alreadySelected = prev.find((s) => s.id === student.id);
                                if (alreadySelected) {
                                  return prev.filter((s) => s.id !== student.id);
                                } else {
                                  return [...prev, student];
                                }
                              });
                            }}>
                            <Check
                              className={cn(
                                'mr-2 h-4 w-4',
                                selectedStudents.find((s) => s.id === student.id)
                                  ? 'opacity-100'
                                  : 'opacity-0',
                              )}
                            />
                            {student.nome}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* Tabela de alunos selecionados */}
            {selectedStudents.length > 0 && (
              <div className='space-y-2'>
                <Label>Alunos selecionados ({selectedStudents.length})</Label>
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
                      {selectedStudents.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell>{student.nome}</TableCell>
                          <TableCell>{student.contato}</TableCell>
                          <TableCell>{student.faixa}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </form>

          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCloseDialog}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleSubmit(updateClassroom)}
              disabled={updateLoading}
              className='gap-2'>
              {updateLoading ? (
                <LoaderIcon className='h-4 w-4 animate-spin' />
              ) : (
                <Save className='h-4 w-4' />
              )}
              Salvar alterações
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
