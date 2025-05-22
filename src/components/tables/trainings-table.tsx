import { useEffect, useState } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { buscarTreinos } from '@/services/treino';


export function DataTableTrainings() {
  const [trainings,setTrainings] = useState([]);

  useEffect(() => {
    const fetchTreinos = async () => {
      const result = await buscarTreinos()
      setTrainings(result)
    }


    fetchTreinos()
    console.log(trainings)
  }, [])

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
          {trainings.map((training) => (
            <TableRow key={training.id}>
              <TableCell className='font-medium'>{training.id}</TableCell>
              <TableCell className='font-medium'>{training.tipo}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
