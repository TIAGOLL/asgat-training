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

import { Skeleton } from '../ui/skeleton';

export function DataTableTrainings() {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchTreinos = async () => {
      const result = await buscarTreinos();
      setLoading(false);
      setTrainings(result);
    };

    fetchTreinos();
  }, []);

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
          {loading &&
            [...Array(5)].map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className='h-6 w-32' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-6 w-24' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-6 w-16' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-6 w-12' />
                </TableCell>
              </TableRow>
            ))}
          {!loading &&
            trainings.map((training) => (
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
