import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { buscarAlunos } from '@/services/alunos';
import { useEffect, useState } from 'react';
import { z } from 'zod';


export function DataTableStudents() {
  const [students, setStudents] = useState([])

  useEffect(() => {
    const fetchStudents = async () => {
      const result = await buscarAlunos()
      setStudents(result)
    }


    fetchStudents()
    console.log(students)
  }, [])

  return (
    <div className='w-full !rounded-lg border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='font-bold'>Nome</TableHead>
            <TableHead className='font-bold'>Contato</TableHead>
            <TableHead className='font-bold'>Faixa</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students?.map((student) => (
            <TableRow key={student?.email}>
              <TableCell className='font-medium'>{student?.nome}</TableCell>
              <TableCell>{student?.contato}</TableCell>
              <TableCell>{student?.faixa}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
