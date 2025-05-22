import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { buscarTurmas } from '@/services/turmas';
import { useState , useEffect } from 'react';
export function DataTableClassrooms() {

  const [clasrooms, setClasrooms] = useState([])

  useEffect(() => {
    const fetchStudents = async () => {
      const result = await buscarTurmas()
      setClasrooms(result)
    }


    fetchStudents()
    console.log(clasrooms)
  }, [])

  return (
    <div className='w-full !rounded-lg border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='font-bold'>Nome</TableHead>
            <TableHead className='font-bold'>Dia</TableHead>
            <TableHead className='font-bold'>Horarios</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clasrooms.map((classroom) => (
            <TableRow key={classroom.name}>
              <TableCell className='font-medium'>{classroom.nome}</TableCell>
              <TableCell className='font-medium'>{classroom.dia}</TableCell>
              <TableCell className='font-medium'>{classroom.horario}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
