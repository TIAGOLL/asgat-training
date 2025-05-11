import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';

import { notesByStudentSchema } from '@/components/forms/validations/notes-by-student-schema';
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type NotesByStudentSchema = z.infer<typeof notesByStudentSchema>;

export function NotesByStudentForm() {
  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
  } = useForm<NotesByStudentSchema>({
    resolver: zodResolver(notesByStudentSchema),
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
    { id: '1', name: 'Ana Clara Oliveira', grade: 1 },
    { id: '2', name: 'Bruno Henrique Silva', grade: 1 },
    { id: '3', name: 'Carla Maria Santos', grade: 1 },
    { id: '4', name: 'Diego Ferreira Lima', grade: 1 },
    { id: '5', name: 'Eduarda Souza Costa', grade: 1 },
  ];

  async function applyNotesToStudents(data: NotesByStudentSchema) {
    console.log('applyNotesToStudents', { data });
    navigate(`/classes/final-notes/${id}`);
  }

  return (
    <form
      onSubmit={handleSubmit(applyNotesToStudents)}
      className='grid w-full grid-cols-6 place-items-center gap-4'>
      <Card className='col-span-6 w-11/12 gap-2'>
        <CardHeader className='col-span-6 place-items-center'>
          <CardTitle>Notas para os alunos</CardTitle>
        </CardHeader>
        <CardContent className='col-span-6 mt-10 grid grid-cols-6 place-items-center gap-2'>
          <div className='col-span-6 grid gap-2'>
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
          <div className='col-span-6 mt-10 grid w-full gap-2'>
            <Table className='border'>
              <TableHeader>
                <TableRow>
                  <TableHead>Aluno</TableHead>
                  <TableHead className='text-center'>Nota</TableHead>
                  <TableHead>Observação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>
                      <div className='flex items-center justify-center gap-2'>
                        <Button variant='outline' size='sm'>
                          -
                        </Button>
                        <span className='font-semibold'>{student.grade}</span>
                        <Button variant='outline' size='sm'>
                          +
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Input />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      <div className='flex w-4/12 flex-row place-content-between gap-4'>
        <Link to={`/classes/attendance-list/${id}`} className='flex items-center gap-2'>
          <Button variant='destructive' className='w-[10rem] justify-between'>
            <ChevronLeft className='size-4' />
            Voltar
          </Button>
        </Link>
        <Button
          type='submit'
          className='w-[10rem] justify-between'
          onClick={() => navigate(`/classes/final-notes/${id}`)}>
          Próximo
          <ChevronRight className='size-4' />
        </Button>
      </div>
    </form>
  );
}
