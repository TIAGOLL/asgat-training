import { zodResolver } from '@hookform/resolvers/zod';
import { Save, User } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

import { FormMessageError } from '../form-message-error';
import { Input } from '../ui/input';
import { createClassesSchema } from './validations/create-classes-schema';

type CreateClassesSchema = z.infer<typeof createClassesSchema>;

export function CreateClassesForm() {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<CreateClassesSchema>({
    resolver: zodResolver(createClassesSchema),
  });

  async function createClasses({ name }: CreateClassesSchema) {
    console.log('createClasses', { name });
  }

  return (
    <form onSubmit={handleSubmit(createClasses)} className='grid w-full grid-cols-6 place-items-center gap-4'>
      <Card className='col-span-6 w-8/12 gap-2'>
        <CardHeader className='col-span-6 place-items-center'>
          <CardTitle>Criar aulas</CardTitle>
        </CardHeader>
        <CardContent className='col-span-6 mt-10 grid grid-cols-6 space-y-7 space-x-2'>
          <div className='col-span-3 grid gap-2'>
            <Label htmlFor='name' className='flex place-items-center gap-2'>
              <User className='size-4' />
              Nome da sala
            </Label>
            <Input id='name' {...register('name')} />
            <FormMessageError error={errors.name?.message} />
          </div>
        </CardContent>
      </Card>
      <div className='col-span-6 mt-6 grid place-items-center gap-4'>
        <Button type='submit' className='w-[10rem] gap-2'>
          <Save className='size-4' />
          Salvar
        </Button>
      </div>
    </form>
  );
}
