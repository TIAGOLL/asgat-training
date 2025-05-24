import { zodResolver } from '@hookform/resolvers/zod';
import { Save } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

import { FormMessageError } from '@/components/form-message-error';
import { createClassesSchema } from '@/components/forms/validations/create-classes-schema';
import { Loader } from '@/components/loader';
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
import { criarAula } from '@/services/aulas';
import { buscarTreinos } from '@/services/treino';
import { buscarTurmas } from '@/services/turmas';

type CreateClassesSchema = z.infer<typeof createClassesSchema>;

export function CreateClassesForm() {
  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
  } = useForm<CreateClassesSchema>({
    resolver: zodResolver(createClassesSchema),
  });

  const [classrooms, setClassrooms] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    const fetchStudents = async () => {
      const result = await buscarTurmas();
      setClassrooms(result);
      const result2 = await buscarTreinos();
      setTrainings(result2);
    };

    fetchStudents();
    console.log(classrooms);
    console.log(trainings);
  }, []);

  async function createClasses(data: CreateClassesSchema) {
    setLoading(true);
    try {
      console.log('Dados do formulário:', data);
      const turmaData = {
        turma_id: data.classroom,
        dia: data.date,
        treino_id: data.training,
        hora: data.time,
      };
      console.log('Enviando para API:', turmaData);
      const response = await criarAula(turmaData);
      toast.success(response.message);
    } catch (error) {
      console.log(error);
      console.error('Erro ao criar turma:', error);
    } finally {
      console.log('Deu certo');
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(createClasses)}
      className='grid w-full grid-cols-6 place-items-center gap-4'>
      <Card className='col-span-6 w-11/12 gap-2'>
        <CardHeader className='col-span-6 place-items-center'>
          <CardTitle>Cadastrar aulas</CardTitle>
        </CardHeader>
        <CardContent className='col-span-6 mt-10 grid grid-cols-6 gap-2'>
          <div className='col-span-6 grid gap-2'>
            <Label>Turma</Label>
            <Select onValueChange={(value) => setValue('classroom', value)}>
              <SelectTrigger {...register('classroom')} className='w-full'>
                <SelectValue placeholder='Selecione...' />
              </SelectTrigger>
              <SelectContent>
                {classrooms.map((classroom) => (
                  <SelectItem key={classroom.id} value={classroom.id}>
                    {classroom.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessageError error={errors.classroom?.message} />
          </div>
          <div className='col-span-6 grid gap-2'>
            <Label>Treino</Label>
            <Select onValueChange={(value) => setValue('training', value)}>
              <SelectTrigger {...register('training')} className='w-full'>
                <SelectValue placeholder='Selecione...' />
              </SelectTrigger>
              <SelectContent>
                {trainings.map((training) => (
                  <SelectItem key={training.id} value={training.id}>
                    {training.tipo}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessageError error={errors.training?.message} />
          </div>
          <div className='col-span-6 grid gap-2'>
            <Label htmlFor='date'>Data</Label>
            <Input id='date' type='date' {...register('date')} />
            <FormMessageError error={errors.date?.message} />
          </div>
          <div className='col-span-6 grid gap-2'>
            <Label htmlFor='time'>Horário</Label>
            <Input id='time' {...register('time')} type='time' />
            <FormMessageError error={errors.time?.message} />
          </div>
        </CardContent>
      </Card>
      <div className='col-span-6 mt-6 place-items-center gap-4'>
        <Button type='submit' className='w-[10rem] gap-2' disabled={loading}>
          {loading && <Loader className='size-4' />}
          {!loading && <Save className='size-4' />}
          Salvar
        </Button>
      </div>
    </form>
  );
}
