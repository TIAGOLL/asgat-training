import { zodResolver } from '@hookform/resolvers/zod';
import { Check, ChevronsUpDown, Save } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';

import { FormMessageError } from '../form-message-error';
import { createClasroomSchema } from './validations/create-classroom-schema';
import { studentSchema } from './validations/entities/students';

type CreateClasroomSchema = z.infer<typeof createClasroomSchema>;
type StudentSchema = z.infer<typeof studentSchema>;

export function CreateClassroomForm() {
  const [studentsList] = useState<StudentSchema[]>([
    {
      id: '1',
      name: 'James Lucas',
      dateOfBirth: new Date('2000-01-01'),
      contact: 42999658574,
      belt: 'black belt',
      entryDate: '2020-01-01',
    },
    {
      id: '2',
      name: 'Lucas',
      dateOfBirth: new Date('2000-01-01'),
      contact: 42999658574,
      belt: 'Red belt',
      entryDate: '2020-01-01',
    },
    {
      id: '3',
      name: 'Jonas',
      dateOfBirth: new Date('2000-01-01'),
      contact: 42999658574,
      belt: 'White belt',
      entryDate: '2020-01-01',
    },
    {
      id: '4',
      name: 'João',
      dateOfBirth: new Date('2000-01-01'),
      contact: 42999658574,
      belt: 'Blue belt',
      entryDate: '2020-01-01',
    },
    {
      id: '5',
      name: 'Maria',
      dateOfBirth: new Date('2000-01-01'),
      contact: 42999658574,
      belt: 'Yellow belt',
      entryDate: '2020-01-01',
    },
    {
      id: '6',
      name: 'Ana',
      dateOfBirth: new Date('2000-01-01'),
      contact: 42999658574,
      belt: 'Green belt',
      entryDate: '2020-01-01',
    },
    {
      id: '7',
      name: 'Carlos',
      dateOfBirth: new Date('2000-01-01'),
      contact: 42999658574,
      belt: 'Brown belt',
      entryDate: '2020-01-01',
    },
    {
      id: '8',
      name: 'Fernanda',
      dateOfBirth: new Date('2000-01-01'),
      contact: 42999658574,
      belt: 'Purple belt',
      entryDate: '2020-01-01',
    },
    {
      id: '9',
      name: 'Roberto',
      dateOfBirth: new Date('2000-01-01'),
      contact: 42999658574,
      belt: 'Orange belt',
      entryDate: '2020-01-01',
    },
    {
      id: '10',
      name: 'Patrícia',
      dateOfBirth: new Date('2000-01-01'),
      contact: 42999658574,
      belt: 'Gray belt',
      entryDate: '2020-01-01',
    },
    {
      id: '11',
      name: 'Juliana',
      dateOfBirth: new Date('2000-01-01'),
      contact: 42999658574,
      belt: 'Pink belt',
      entryDate: '2020-01-01',
    },
    {
      id: '12',
      name: 'Ricardo',
      dateOfBirth: new Date('2000-01-01'),
      contact: 42999658574,
      belt: 'Black belt',
      entryDate: '2020-01-01',
    },
    {
      id: '13',
      name: 'Tatiane',
      dateOfBirth: new Date('2000-01-01'),
      contact: 42999658574,
      belt: 'Red belt',
      entryDate: '2020-01-01',
    },
  ]);
  const [selectedStudents, setSelectedStudents] = useState<StudentSchema[]>([]);
  const days = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
  } = useForm<CreateClasroomSchema>({
    resolver: zodResolver(createClasroomSchema),
  });

  async function createClassroom({ day, local, name, time, students }: CreateClasroomSchema) {
    console.log(day, local, name, time, students);
    console.log(errors);
  }

  return (
    <form onSubmit={handleSubmit(createClassroom)} className='grid w-full grid-cols-6 place-items-center gap-4'>
      <Card className='col-span-6 w-8/12 gap-2'>
        <CardHeader className='flex flex-col items-center justify-center'>
          <CardTitle>Cadastrar turmas</CardTitle>
          <CardDescription>Escolha os alunos que irão fazer parte da turma</CardDescription>
        </CardHeader>
        <CardContent className='mt-10 grid grid-cols-6 space-y-7 space-x-4'>
          <div className='col-span-3 grid gap-2'>
            <Label htmlFor='name'>Nome da turma</Label>
            <Input id='name' {...register('name')} />
            <FormMessageError error={errors.name?.message} />
          </div>

          <div className='col-span-3 grid gap-2'>
            <Label htmlFor='local'>Local</Label>
            <Input type='text' id='local' placeholder='Local' {...register('local')} />
            <FormMessageError error={errors.local?.message} />
          </div>

          <div className='col-span-3 grid gap-2'>
            <Label>Dia da semana</Label>
            <Select onValueChange={(value) => setValue('day', value)}>
              <SelectTrigger {...register('day')} className='w-full'>
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

          <div className='col-span-3 grid gap-2'>
            <Label htmlFor='time'>Horário</Label>
            <Input type='time' id='time' {...register('time')} />
            <FormMessageError error={errors.time?.message} />
          </div>
          <div className='col-span-6 grid justify-center gap-2'>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant='outline' role='combobox' className='flex w-[15rem] justify-between'>
                  Selecione os alunos...
                  <ChevronsUpDown className='opacity-50' />
                </Button>
              </PopoverTrigger>
              <PopoverContent className='p-0'>
                <Command>
                  <CommandInput placeholder='Pesquise...' className='h-9' />
                  <CommandList>
                    <CommandEmpty>Aluno não encontrado.</CommandEmpty>
                    <CommandGroup>
                      {studentsList.map((student) => (
                        <CommandItem
                          key={student.id}
                          value={student.name}
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
                          {student.name}
                          <Check className={cn('ml-auto', selectedStudents.find((s) => s.id === student.id) ? 'opacity-100' : 'opacity-0')} />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <div className='col-span-6 grid gap-2'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Data de nascimento</TableHead>
                  <TableHead>Contato</TableHead>
                  <TableHead>Faixa</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedStudents.map((selectedStudent) => (
                  <TableRow key={selectedStudent.id}>
                    <TableCell>{selectedStudent.name}</TableCell>
                    <TableCell>
                      {selectedStudent.dateOfBirth.getDay() +
                        '/' +
                        selectedStudent.dateOfBirth.getMonth() +
                        '/' +
                        selectedStudent.dateOfBirth.getFullYear()}
                    </TableCell>
                    <TableCell>{selectedStudent.contact}</TableCell>
                    <TableCell>{selectedStudent.belt}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Total de alunos</TableCell>
                  <TableCell className='text-right'>{selectedStudents.length}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </CardContent>
      </Card>
      <div className='col-span-6 mt-6 grid place-items-center gap-4'>
        <Button type='submit' className='w-[10rem] gap-2'>
          <Save className='size-4' />
          Salvar
        </Button>
      </div>
    </form>
  );
}
