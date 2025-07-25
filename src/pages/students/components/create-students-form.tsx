import { zodResolver } from '@hookform/resolvers/zod';
import { Calendar, Contact, DoorOpen, Save, User } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { z } from 'zod';

import { Loader } from '@/components/loader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { criarAluno } from '@/services/alunos';

import { FormMessageError } from '../../../components/form-message-error';
import { studentSchema } from '../../../components/forms/validations/entities/students';
import { Input } from '../../../components/ui/input';

type StudentsSchema = z.infer<typeof studentSchema>;

export function CreateStudentsForm() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [belts] = useState([
    { id: 1, name: 'Branca' },
    { id: 2, name: 'Branca com amarela' },
    { id: 3, name: 'Amarela' },
    { id: 4, name: 'Verde' },
    { id: 5, name: 'Verde com azul' },
    { id: 6, name: 'Azul' },
    { id: 7, name: 'Azul com vermelha' },
    { id: 8, name: 'Vermelha' },
    { id: 10, name: 'Vermelha com preta' },
    { id: 11, name: 'Preta' },
  ]);

  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
  } = useForm<StudentsSchema>({
    defaultValues: {
      data_ingresso: new Date().toISOString().split('T')[0],
    },
    resolver: zodResolver(studentSchema),
  });

  async function criar({ faixa, contato, idade, data_ingresso, nome }: StudentsSchema) {
    setLoading(true);
    const res = await criarAluno({ faixa, contato, idade, data_ingresso, nome });
    setLoading(false);
    toast.success(res.message);
    navigate('/students');
  }

  return (
    <form
      onSubmit={handleSubmit(criar)}
      className='grid w-full grid-cols-6 place-items-center gap-4'>
      <Card className='col-span-6 w-11/12 gap-2'>
        <CardHeader className='col-span-6 place-items-center'>
          <CardTitle>Cadastrar alunos</CardTitle>
        </CardHeader>
        <CardContent className='col-span-6 mt-10 grid grid-cols-6 space-y-7 space-x-2'>
          <div className='col-span-6 grid gap-2'>
            <Label htmlFor='name' className='flex place-items-center gap-2'>
              <User className='size-4' />
              Nome completo
            </Label>
            <Input
              id="name"
              {...register("nome")}
            />
            <FormMessageError error={errors.nome?.message} />
          </div>
          <div className='col-span-6 grid gap-2'>
            <Label htmlFor='idade' className='flex place-items-center gap-2'>
              <Calendar className='size-4' />
              Data de nascimento
            </Label>
            <Input id='idade' {...register('idade', { valueAsDate: true })} type='date' />
            <FormMessageError error={errors.idade?.message} />
          </div>
          <div className='col-span-6 grid gap-2'>
            <Label htmlFor='contato' className='flex place-items-center gap-2'>
              <Contact className='size-4' />
              Contato
            </Label>
            <Input id="contato" {...register('contato', )}
          />
          <FormMessageError error={errors.contato?.message} />
          </div>
          <div className='col-span-6 grid gap-2'>
            <Label>Faixa</Label>
            <Select onValueChange={(value) => setValue('faixa', value)}>
              <SelectTrigger {...register('faixa')} className='w-full'>
                <SelectValue placeholder='Selecione...' />
              </SelectTrigger>
              <SelectContent>
                {belts.map((belt) => (
                  <SelectItem key={belt.id} value={belt.name}>
                    {belt.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessageError error={errors.faixa?.message} />
          </div>
          <div className='col-span-6 grid gap-2'>
            <Label htmlFor='entryDate' className='flex place-items-center gap-2'>
              <DoorOpen className='size-4' />
              Data de entrada
            </Label>
            <Input id='entryDate' {...register('data_ingresso')} type='date' />
            <FormMessageError error={errors.data_ingresso?.message} />
          </div>
        </CardContent>
      </Card>
      <div className='col-span-6 mt-6 grid place-items-center gap-4'>
        <Button type='submit' className='w-[10rem] gap-2' disabled={loading}>
          {loading && <Loader className='size-4' />}
          {!loading && <Save className='size-4' />}
          Salvar
        </Button>
      </div>
    </form>
  );
}
