import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft, Save } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';

import { finishClassSchema } from '@/components/forms/validations/finish-class-schema';
import { Sidebar } from '@/components/sidebar';
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
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type FinishClassSchema = z.infer<typeof finishClassSchema>;

export function FinalNotes() {
  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
  } = useForm<FinishClassSchema>({
    resolver: zodResolver(finishClassSchema),
  });

  const navigate = useNavigate();
  const { id } = useParams();

  const [exercises] = useState([
    { id: '1', name: 'Exercício 1' },
    { id: '2', name: 'Exercício 2' },
    { id: '3', name: 'Exercício 3' },
    { id: '4', name: 'Exercício 4' },
    { id: '5', name: 'Exercício 5' },
  ]);

  const students = [
    { id: '1', name: 'Leonardo dos Santos Veque', grade: 1 },
    { id: '2', name: 'Leonardo dos Santos Veque', grade: 1 },
    { id: '3', name: 'Leonardo dos Santos Veque', grade: 1 },
    { id: '4', name: 'Leonardo dos Santos Veque', grade: 1 },
    { id: '5', name: 'Leonardo dos Santos Veque', grade: 1 },
  ];

  async function finishClass(data: FinishClassSchema) {
    console.log('finishClass', { data });
  }

  return (
    <div className='flex flex-row'>
      <Sidebar />
      <div className='mt-10 flex w-full flex-col items-center justify-start'>
        <form
          onSubmit={handleSubmit(finishClass)}
          className='grid w-full grid-cols-6 place-items-center gap-4'>
          <Card className='col-span-6 w-8/12 gap-2'>
            <CardHeader className='col-span-6 place-items-center'>
              <CardTitle>Finalizar Aula</CardTitle>
            </CardHeader>
            <CardContent className='col-span-6 mt-10 grid grid-cols-6 place-items-center gap-2'>
              <div className='col-span-6 grid w-full grid-cols-6 gap-4'>
                <div className='col-span-2 grid w-full gap-2'>
                  <Label>Turma:</Label>
                  <Input defaultValue='Time de Competicao - segunda' />
                </div>

                <div className='col-span-2 grid gap-2'>
                  <Label>Data e hora:</Label>
                  <div className='flex flex-1 gap-2'>
                    <Input type='date' defaultValue='2025-03-03' />
                    <Input type='time' defaultValue='19:30' />
                  </div>
                </div>

                <div className='col-span-2 grid gap-2'>
                  <Label>Exercício</Label>
                  <Select>
                    <SelectTrigger className='w-[15rem]'>
                      <SelectValue placeholder='Selecione...' />
                    </SelectTrigger>
                    <SelectContent>
                      {exercises.map((exercise) => (
                        <SelectItem key={exercise.id} value={exercise.id}>
                          {exercise.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator className='col-span-6 h-[2px] w-10/12' />

              {/* Tabela */}
              <div className='col-span-6 mt-4 flex justify-center'>
                <Table className='w-[400px] rounded-md border'>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Aluno</TableHead>
                      <TableHead className='text-center'>Nota final</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>{student.name}</TableCell>
                        <TableCell className='text-center font-bold text-green-600'>
                          {student.grade}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          <div className='col-span-6 flex w-4/12 flex-row place-content-between gap-4'>
            <Link to={`/classes/notes/${id}`} className='flex items-center gap-2'>
              <Button variant='destructive' className='w-[10rem] justify-between'>
                <ChevronLeft className='size-4' />
                Voltar
              </Button>
            </Link>
            <Button type='submit' className='w-[10rem] justify-between'>
              <Save className='size-4' />
              Finalizar aula
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
