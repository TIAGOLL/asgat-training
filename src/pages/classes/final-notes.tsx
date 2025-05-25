import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft, Save } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { z } from 'zod';

import { finishClassSchema } from '@/components/forms/validations/finish-class-schema';
import { Loader } from '@/components/loader';
import { Sidebar } from '@/components/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { buscarAula, finalizarAula } from '@/services/aulas';

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

  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState<boolean>();
  const [aula, setAula] = useState({});
  const [dados, setDados] = useState({});
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const fetchAulas = async () => {
      const result = await buscarAula(id);
      setAula(result);
      setExercises(result.treino.exercicios);
      const aulas = localStorage.getItem('aulas');
      const aulasOBJ = JSON.parse(aulas);
      setDados(aulasOBJ);

      setAlunos(result.turma.alunos);
    };
    fetchAulas();
  }, []);

  async function finishClass() {
    setLoading(true);
    const res = await finalizarAula(dados);
    toast.success(res);
    setLoading(false);
    navigate('/classes');
  }

  return (
    <div className='flex flex-row'>
      <Sidebar />
      <div className='mt-10 flex w-full flex-col items-center justify-start'>
        <form
          onSubmit={handleSubmit(finishClass)}
          className='grid w-full grid-cols-6 place-items-center gap-4'>
          <Card className='col-span-6 w-11/12 gap-2'>
            <CardHeader className='col-span-6 place-items-center'>
              <CardTitle>Finalizar Aula</CardTitle>
            </CardHeader>
            <CardContent className='col-span-6 mt-10 grid grid-cols-6 place-items-center gap-2'>
              <div className='col-span-6 grid w-full grid-cols-6 gap-4'>
                <div className='col-span-6 grid w-full gap-2'>
                  <Label>Turma:</Label>
                  <Input defaultValue='Time de Competicao - segunda' />
                </div>

                <div className='col-span-6 grid w-full gap-2'>
                  <Label>Data e hora:</Label>
                  <div className='grid grid-cols-3 gap-2'>
                    <Input type='date' defaultValue='2025-03-03' className='col-span-2' />
                    <Input type='time' defaultValue='19:30' className='col-span-1' />
                  </div>
                </div>
              </div>

              {/* Tabela */}
              <div className='col-span-6 mt-4 flex w-full flex-col gap-4 overflow-x-auto'>
                <Label>Médias:</Label>
                <Table className='min-w-[500px] rounded-md border'>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Aluno</TableHead>
                      <TableHead className='text-center'>Nota final</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {alunos.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>{student.nome}</TableCell>
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
          <div className='flex w-4/12 flex-row place-content-between gap-4'>
            <Link to={`/classes/notes/${id}`} className='flex items-center gap-2'>
              <Button variant='destructive' className='w-[10rem] justify-between'>
                <ChevronLeft className='size-4' />
                Voltar
              </Button>
            </Link>
            <Button type='submit' className='w-[10rem] justify-between' disabled={loading}>
              {loading && <Loader className='size-4' />}
              {!loading && <Save className='size-4' />}
              Finalizar aula
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
