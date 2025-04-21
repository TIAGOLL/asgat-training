import { zodResolver } from '@hookform/resolvers/zod';
import { Check, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';

import { attendanceListSchema } from '@/components/forms/validations/attendance-list-schema';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type AttendanceListSchema = z.infer<typeof attendanceListSchema>;

type Student = {
  id: string;
  name: string;
  present: boolean | null;
};

export function AttendanceListForm() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<AttendanceListSchema>({
    resolver: zodResolver(attendanceListSchema),
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const [students] = useState([
    { id: '1', name: 'Leonardo dos Santos Veque', present: null },
    { id: '2', name: 'Leonardo dos Santos Veque', present: null },
    { id: '3', name: 'Leonardo dos Santos Veque', present: null },
    { id: '4', name: 'Leonardo dos Santos Veque', present: null },
    { id: '5', name: 'Leonardo dos Santos Veque', present: null },
  ]);

  function handleAttendance(data: AttendanceListSchema) {
    console.log(data);
    navigate(`/classes/notes/${id}`);
  }

  return (
    <form
      onSubmit={handleSubmit(handleAttendance)}
      className='grid w-full grid-cols-6 place-items-center gap-4'>
      <Card className='col-span-6 w-8/12 gap-2'>
        <CardHeader className='col-span-6 place-items-center'>
          <CardTitle>Lista de Presença</CardTitle>
        </CardHeader>
        <CardContent className='col-span-6 mt-10 grid grid-cols-6 gap-2'>
          <div className='col-span-6 overflow-x-auto'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className='font-bold'>Nome</TableHead>
                  <TableHead className='font-bold'>Presença</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className='font-medium'>{student.name}</TableCell>
                    <TableCell className='flex gap-2'>
                      {/* Presente */}
                      <label
                        htmlFor={`students.${student.id}.present-true`}
                        className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded text-white ${student.present === true ? 'bg-green-600' : 'bg-green-600/30 hover:bg-green-600'}`}>
                        <Check size={16} />
                      </label>
                      <input
                        type='radio'
                        value='true'
                        checked={student.present === true}
                        id={`students.${student.id}.present-true`}
                        className='hidden'
                      />

                      {/* Ausente */}
                      <label
                        htmlFor={`students.${student.id}.present-false`}
                        className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded text-white ${student.present === false ? 'bg-red-600' : 'bg-red-600/30 hover:bg-red-600'}`}>
                        <X size={16} />
                      </label>
                      <input
                        type='radio'
                        value='false'
                        checked={student.present === false}
                        id={`students.${student.id}.present-false`}
                        className='hidden'
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      <div className='col-span-6 flex w-4/12 flex-row place-content-between gap-4'>
        <Link to={`/classes/${id}`} className='flex items-center gap-2'>
          <Button variant='destructive' className='w-[10rem] justify-between'>
            <ChevronLeft className='size-4' />
            Voltar
          </Button>
        </Link>
        <Button
          type='submit'
          className='w-[10rem] justify-between'
          onClick={() => navigate(`/classes/notes/${id}`)}>
          Próximo
          <ChevronRight className='size-4' />
        </Button>
      </div>
    </form>
  );
}
