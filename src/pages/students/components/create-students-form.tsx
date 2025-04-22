import { zodResolver } from '@hookform/resolvers/zod';
import { Calendar, Contact, DoorOpen, Save, User } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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

import { FormMessageError } from '../../../components/form-message-error';
import { studentSchema } from '../../../components/forms/validations/entities/students';
import { Input } from '../../../components/ui/input';

type StudentsSchema = z.infer<typeof studentSchema>;

export function CreateStudentsForm() {
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
      entryDate: new Date().toISOString().split('T')[0],
    },
    resolver: zodResolver(studentSchema),
  });

  async function createTraining({
    belt,
    contact,
    dateOfBirth,
    entryDate,
    id,
    name,
  }: StudentsSchema) {
    console.log('createTraining', { belt, contact, dateOfBirth, entryDate, id, name });
  }

  return (
    <form
      onSubmit={handleSubmit(createTraining)}
      className='grid w-full grid-cols-6 place-items-center gap-4'>
      <Card className='col-span-6 w-8/12 gap-2'>
        <CardHeader className='col-span-6 place-items-center'>
          <CardTitle>Cadastrar alunos</CardTitle>
        </CardHeader>
        <CardContent className='col-span-6 mt-10 grid grid-cols-6 space-y-7 space-x-2'>
          <div className='col-span-3 grid gap-2'>
            <Label htmlFor='name' className='flex place-items-center gap-2'>
              <User className='size-4' />
              Nome completo
            </Label>
            <Input id='name' {...register('name')} />
            <FormMessageError error={errors.name?.message} />
          </div>
          <div className='col-span-3 grid gap-2'>
            <Label htmlFor='dateOfBirth' className='flex place-items-center gap-2'>
              <Calendar className='size-4' />
              Data de nascimento
            </Label>
            <Input
              id='dateOfBirth'
              {...register('dateOfBirth', { valueAsDate: true })}
              type='date'
            />
            <FormMessageError error={errors.dateOfBirth?.message} />
          </div>
          <div className='col-span-3 grid gap-2'>
            <Label htmlFor='contact' className='flex place-items-center gap-2'>
              <Contact className='size-4' />
              Contato
            </Label>
            <Input id='contact' {...register('contact', { valueAsNumber: true })} />
            <FormMessageError error={errors.contact?.message} />
          </div>
          <div className='col-span-3 grid gap-2'>
            <Label>Faixa</Label>
            <Select onValueChange={(value) => setValue('belt', value)}>
              <SelectTrigger {...register('belt')} className='w-full'>
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
            <FormMessageError error={errors.belt?.message} />
          </div>
          <div className='col-span-3 grid gap-2'>
            <Label htmlFor='entryDate' className='flex place-items-center gap-2'>
              <DoorOpen className='size-4' />
              Data de entrada
            </Label>
            <Input id='entryDate' {...register('entryDate')} type='date' />
            <FormMessageError error={errors.entryDate?.message} />
          </div>
        </CardContent>
      </Card>
      <div className='col-span-6 mt-6 grid place-items-center gap-4'>
        <Button
          type='submit'
          className='w-[10rem] gap-2'
          onClick={() => console.log(errors.entryDate)}>
          <Save className='size-4' />
          Salvar
        </Button>
      </div>
    </form>
  );
}
