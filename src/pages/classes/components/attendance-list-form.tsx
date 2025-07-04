import { zodResolver } from '@hookform/resolvers/zod';
import { Check, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';

import { attendanceListSchema } from '@/components/forms/validations/attendance-list-schema';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { buscarAula } from '@/services/aulas';

type AttendanceListSchema = z.infer<typeof attendanceListSchema>;

type Student = {
  id: number;
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

  const [loading, setLoading] = useState(true);
  const [alunos, setAlunos] = useState([]);
  const [aula, setAula] = useState({});
  const [dados, setDados] = useState({});

  useEffect(() => {
    const fetchAulas = async () => {
      const result = await buscarAula(id);

      const dadosSalvos = localStorage.getItem('aulas');
      let dadosIniciais = {
        aula_id: result.id,
        presencas: [],
      };
  
      if (dadosSalvos) {
        const parsed = JSON.parse(dadosSalvos);
        if (parsed.aula_id === result.id) {
          dadosIniciais = parsed;
        }
      }
  
      setAula(result);
      setDados(dadosIniciais);
      /*
      setDados({
        aula_id: result.id,
        presencas: [],
      });*/

      setLoading(false);
      setAlunos(result.turma.alunos);
    };
    fetchAulas();
  }, []);

  function handleAttendance(data: AttendanceListSchema) {
    navigate(`/classes/notes/${id}`);
  }

  function updateDados(studentId, presenca) {
    setDados((prevDados) => {
      const updatedDados = { ...prevDados };
      const alunoExiste = updatedDados.presencas.find((p) => p.aluno_id === studentId);

      if (alunoExiste) {
        alunoExiste.presenca = presenca;
      } else {
        updatedDados.presencas.push({ aluno_id: studentId, presenca });
      }
      return updatedDados;
    });
  }

  return (
    <form
      onSubmit={handleSubmit(handleAttendance)}
      className='grid w-full grid-cols-6 place-items-center gap-4'>
      <Card className='col-span-6 w-11/12 gap-2'>
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
                {loading &&
                  [...Array(5)].map((_, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Skeleton className='h-6' />
                      </TableCell>
                      <TableCell>
                        <Skeleton className='h-6' />
                      </TableCell>
                      <TableCell>
                        <Skeleton className='h-6' />
                      </TableCell>
                    </TableRow>
                  ))}
                {!loading &&
                  alunos?.map((student) => {
                    const isPresent =
                      dados?.presencas?.find((p) => p.aluno_id === student.id)?.presenca === true;
                    const isAbsent =
                      dados?.presencas?.find((p) => p.aluno_id === student.id)?.presenca === false;

                    return (
                      <TableRow key={student.id}>
                        <TableCell className='font-medium'>{student.nome}</TableCell>
                        <TableCell className='flex gap-2'>
                          {/* Presente */}
                          <label
                            htmlFor={`students.${student.id}.present-true`}
                            className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded text-white ${
                              isPresent ? 'bg-green-600' : 'bg-green-600/0 hover:bg-green-600'
                            }`}>
                            <Check size={16} />
                          </label>
                          <input
                            onChange={() => updateDados(student.id, true)}
                            type='radio'
                            name={`student-${student.id}`}
                            value='true'
                            checked={isPresent}
                            id={`students.${student.id}.present-true`}
                            className='hidden'
                          />

                          {/* Ausente */}
                          <label
                            htmlFor={`students.${student.id}.present-false`}
                            className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded text-white ${
                              isAbsent ? 'bg-red-600' : 'bg-red-600/0 hover:bg-red-600'
                            }`}>
                            <X size={16} />
                          </label>
                          <input
                            onChange={() => updateDados(student.id, false)}
                            type='radio'
                            name={`student-${student.id}`}
                            value='false'
                            checked={isAbsent}
                            id={`students.${student.id}.present-false`}
                            className='hidden'
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      <div className='flex w-4/12 flex-row place-content-between gap-4'>
        <Link to={`/classes`} className='flex items-center gap-2'>
          <Button variant='destructive' className='w-[10rem] justify-between'>
            <ChevronLeft className='size-4' />
            Voltar
          </Button>
        </Link>
        <Button
          type='submit'
          className='w-[10rem] justify-between'
          onClick={() => {
            localStorage.setItem('aulas', JSON.stringify(dados));
            navigate(`/classes/notes/${id}`);
          }}>
          Próximo
          <ChevronRight className='size-4' />
        </Button>
      </div>
    </form>
  );
}


/*
{
  "id": 1,
  "dia": "2020-10-10",
  "turma_id": 1,
  "treino_id": 1,
  "user_id": 1,
  "created_at": "2025-05-24T01:59:19.000000Z",
  "updated_at": "2025-05-24T01:59:19.000000Z",
  "turma": {
      "id": 1,
      "nome": "awdawd",
      "local": "awdawd",
      "horario": "10:30:00",
      "dia": "Segunda                                                                                                                                                                                                                                                        ",
      "user_id": 1,
      "created_at": "2025-05-24T00:37:03.000000Z",
      "updated_at": "2025-05-24T00:37:03.000000Z",
      "alunos": [
          {
              "id": 1,
              "nome": "Tiago Emanuel de Lima",
              "idade": "2020-10-10",
              "contato": "42984066420",
              "faixa": "Amarela",
              "data_ingresso": "2025-05-24",
              "user_id": 1,
              "created_at": "2025-05-24T17:23:18.000000Z",
              "updated_at": "2025-05-24T17:23:18.000000Z",
              "pivot": {
                  "turma_id": 1,
                  "aluno_id": 1
              }
          },
          {
              "id": 2,
              "nome": "Luiz",
              "idade": "2020-10-10",
              "contato": "42984066420",
              "faixa": "Amarela",
              "data_ingresso": "2025-05-24",
              "user_id": 1,
              "created_at": "2025-05-24T17:23:25.000000Z",
              "updated_at": "2025-05-24T17:23:25.000000Z",
              "pivot": {
                  "turma_id": 1,
                  "aluno_id": 2
              }
          }
      ]
  },
  "treino": {
      "id": 1,
      "tipo": "forca",
      "user_id": 1,
      "created_at": "2025-05-24T00:37:21.000000Z",
      "updated_at": "2025-05-24T00:37:21.000000Z"
  }
}


*/
