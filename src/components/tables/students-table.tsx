import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export function DataTableStudents() {
  const students = [
    {
      id: 1,
      name: 'Lucas Ferreira',
      email: 'teste@teste.com',
      cpf: '123.456.789-00',
    },
    {
      id: 2,
      name: 'Maria Silva',
      email: 'teste@teste.com',
      cpf: '987.654.321-00',
    },
    {
      id: 3,
      name: 'João Santos',
      email: 'teste@teste.com',
      cpf: '456.789.123-00',
    },
    {
      id: 4,
      name: 'Ana Oliveira',
      email: 'teste@teste.com',
      cpf: '321.654.987-00',
    },
    {
      id: 5,
      name: 'Pedro Almeida',
      email: 'teste@teste.com',
      cpf: '654.321.789-00',
    },
    {
      id: 6,
      name: 'Juliana Costa',
      email: 'teste@teste.com',
      cpf: '789.123.456-00',
    },
    {
      id: 7,
      name: 'Ricardo Lima',
      email: 'teste@teste.com',
      cpf: '159.753.486-00',
    },
    {
      id: 8,
      name: 'Fernanda Rocha',
      email: 'teste@teste.com',
      cpf: '753.159.486-00',
    },
    {
      id: 9,
      name: 'Gabriel Martins',
      email: 'teste@teste.com',
      cpf: '951.753.852-00',
    },
    {
      id: 10,
      name: 'Larissa Pereira',
      email: 'teste@teste.com',
      cpf: '852.951.753-00',
    },
  ];

  return (
    <div className='w-full !rounded-lg border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='font-bold'>Nome</TableHead>
            <TableHead className='font-bold'>Email</TableHead>
            <TableHead className='font-bold'>CPF</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students?.map((student) => (
            <TableRow key={student?.email}>
              <TableCell className='font-medium'>{student?.name}</TableCell>
              <TableCell>{student?.email}</TableCell>
              <TableCell>{student?.cpf}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
