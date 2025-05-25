import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
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

type NotesByStudentSchema = z.infer<typeof notesByStudentSchema>;

export function NotesByStudentForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [aula, setAula] = useState({});
  const [dados, setDados] = useState({});
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState();

  useEffect(() => {
    const fetchAulas = async () => {
      const result = await buscarAula(id);
      setAula(result);
      setExercises(result.treino.exercicios);
      const aulas = localStorage.getItem('aulas');
      const aulasOBJ = JSON.parse(aulas);
      setDados(aulasOBJ);
      setLoading(false);

      setAlunos(result.turma.alunos);
    };
    fetchAulas();
  }, []);

  useEffect(() => {}, [dados]);

  useEffect(() => {
    setDados((prevDados) => {
      const updatedDados = { ...prevDados };
      updatedDados.desempenho = {};
      exercises.forEach((value) => {
        updatedDados.desempenho[value.id] = [];
      });
      return updatedDados;
    });
  }, [exercises]);

  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
  } = useForm<NotesByStudentSchema>({
    resolver: zodResolver(notesByStudentSchema),
  });

  async function applyNotesToStudents(data: NotesByStudentSchema) {}

  function updateDados(studentId, exercicioID, nota) {
    setDados((prevDados) => {
      const updatedDados = { ...prevDados };
      if (!Array.isArray(updatedDados.desempenho[exercicioID])) {
        updatedDados.desempenho[exercicioID] = [];
      }

      const alunoExiste = updatedDados.desempenho[exercicioID].find(
        (p) => p.aluno_id === studentId,
      );

      if (alunoExiste) {
        alunoExiste.nota = nota;
      } else {
        updatedDados.desempenho[exercicioID].push({ aluno_id: studentId, nota });
      }
      return updatedDados;
    });
    console.log(dados);
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
            <Select value={selectedExercise} onValueChange={setSelectedExercise}>
              <SelectTrigger className='w-[15rem]'>
                <SelectValue placeholder='Selecione...' />
              </SelectTrigger>
              <SelectContent>
                {exercises.map((exercise) => (
                  <SelectItem key={exercise.id} value={exercise.id.toString()}>
                    {exercise.nome}
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
                  alunos.map((aluno) => (
                    <TableRow key={aluno.id}>
                      <TableCell>{aluno.nome}</TableCell>
                      <TableCell>
                        <div className='flex items-center justify-center gap-2'>
                          <Button
                            variant='outline'
                            size='sm'
                            onClick={() => {
                              if (aluno.nota < 1) {
                                return;
                              }
                              aluno.nota -= 1;
                              updateDados(aluno.id, selectedExercise, aluno.nota - 1);
                            }}>
                            -
                          </Button>
                          {!aluno.nota ? (aluno.nota = 0) : aluno.nota}
                          <Button
                            variant='outline'
                            size='sm'
                            onClick={() => {
                              if (aluno.nota > 9) {
                                return;
                              }
                              aluno.nota += 1;
                              updateDados(aluno.id, selectedExercise, aluno.nota + 1);
                            }}>
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
        <Button
          variant='destructive'
          className='w-[10rem] justify-between'
          onClick={() => {
            localStorage.setItem('aulas', JSON.stringify(dados));
            navigate(`/classes/attendance-list/${id}`);
          }}>
          <ChevronLeft className='size-4' />
          Voltar
        </Button>
        <Button
          type='submit'
          className='w-[10rem] justify-between'
          onClick={() => {
            localStorage.setItem('aulas', JSON.stringify(dados));
            navigate(`/classes/final-notes/${id}`);
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
    "id": 2,
    "dia": "2025-06-10",
    "turma_id": 1,
    "treino_id": 3,
    "user_id": 1,
    "created_at": "2025-05-23T02:59:46.000000Z",
    "updated_at": "2025-05-23T02:59:46.000000Z",
    "turma": {
        "id": 1,
        "nome": "asd",
        "local": "CETT",
        "horario": "19:00:00",
        "dia": "Quarta                                                                                                                                                                        ",
        "user_id": 1,
        "created_at": "2025-05-23T02:44:06.000000Z",
        "updated_at": "2025-05-23T02:44:06.000000Z",
        "alunos": [
            {
                "id": 1,
                "nome": "Faisca Risonha",
                "idade": "2001-05-20",
                "contato": "42999560012",
                "faixa": "Azul",
                "data_ingresso": "2025-05-22",
                "user_id": 1,
                "created_at": "2025-05-22T03:02:40.000000Z",
                "updated_at": "2025-05-22T03:02:40.000000Z",
                "pivot": {
                    "turma_id": 1,
                    "aluno_id": 1
                }
            }
        ]
    },
    "treino": {
        "id": 3,
        "tipo": "resistencia",
        "user_id": 1,
        "created_at": "2025-05-22T03:13:27.000000Z",
        "updated_at": "2025-05-22T03:13:27.000000Z",
        "exercicios": [
            {
                "id": 2,
                "nome": "Flexoes - 10 rep.",
                "treino_id": 3,
                "created_at": "2025-05-22T03:13:27.000000Z",
                "updated_at": "2025-05-22T03:13:27.000000Z"
            }
        ]
    }
}


*/
