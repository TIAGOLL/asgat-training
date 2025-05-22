import { zodResolver } from '@hookform/resolvers/zod';
import { Save } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { FormMessageError } from '@/components/form-message-error';
import { createClassesSchema } from '@/components/forms/validations/create-classes-schema';
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
import { criarTurma } from '@/services/turmas';

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

  const [classrooms] = useState([
    { id: '1', name: 'CT' },
    { id: '2', name: 'Visconde' },
    { id: '3', name: 'Cristo Rei' }
  ]);
  const [trainings] = useState([
    { id: '1', name: 'Treino 1' },
    { id: '2', name: 'Treino 2' },
    { id: '3', name: 'Treino 3' },
    { id: '4', name: 'Treino 4' },
    { id: '5', name: 'Treino 5' },
    { id: '6', name: 'Treino 6' },
    { id: '7', name: 'Treino 7' },
    { id: '8', name: 'Treino 8' },
    { id: '9', name: 'Treino 9' },
    { id: '10', name: 'Treino 10' },
  ]);


  async function createClasses(data: CreateClassesSchema) {
    try {
      
      console.log("Dados do formulário:", data);
      
      // Prepara o objeto de dados para envio
      const turmaData = {
        classroom: data.classroom,
        date: data.date,
        training: data.training,
        time: data.time,
        alunos: [1]
      };
      
      console.log("Enviando para API:", turmaData);
      
      // Chamada à API com await para esperar a resposta
      const response = await criarTurma(turmaData);
      
      console.log("Resposta da API:", response);
      
      // Notifica o usuário do sucesso
     
      
      // Reseta o formulário após sucesso
      
      
    } catch (error) {
      console.error("Erro ao criar turma:", error);
      
      // Notifica o usuário do erro
   
    } finally {
      console.log('Deu certo');
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
                    {classroom.name}
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
                    {training.name}
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
        <Button type='submit' className='w-[10rem] gap-2'>
          <Save className='size-4' />
          Salvar
        </Button>
      </div>
    </form>
  );
}
