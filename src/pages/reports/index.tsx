import { zodResolver } from '@hookform/resolvers/zod';
import { Save } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import z from 'zod';

import { FormMessageError } from '@/components/form-message-error';
import { Sidebar } from '@/components/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { buscarAlunos } from '@/services/alunos';

export const createResportsSchema = z.object({
  nome: z.string().optional(),
  idade: z.string().optional(),
  turma: z.string().optional(),
  dataIngresso: z.string().optional(),
  graduacao: z.string().optional(),
  professor: z.string().optional(),
  mes: z.string().optional(),
  presenca: z.string().optional(),
  faltas: z.string().optional(),
  situacao: z.string().optional(),
  poomsee: z.string().optional(),
  seban: z.string().optional(),
  explosao: z.string().optional(),
  fisico: z.string().optional(),
  potencia: z.string().optional(),
  resistencia: z.string().optional(),
  combate: z.string().optional(),
  esforco: z.string().optional(),
  nivel: z.string().optional(),
});

type CreateReportsSchema = z.infer<typeof createResportsSchema>;

export function Reports() {
  const {
    formState: { errors },
    register,
    setValue,
  } = useForm<CreateReportsSchema>({
    resolver: zodResolver(createResportsSchema),
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const [Loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    const fetchStudents = async () => {
      const result = await buscarAlunos();
      setValue('nome', result.nome);
      setLoading(false);
    };
    searchParams.get('id');
    fetchStudents();
  }, []);

  return (
    <div className='flex flex-row'>
      <Sidebar />
      <div className='flex w-full flex-col items-center justify-start'>
        <h1>Turmas</h1>
        <div className='flex w-[calc(80vw)] flex-col items-center justify-start'>
          <Card className='flex w-full'>
            <CardHeader>
              <CardTitle>Relatório por aluno</CardTitle>
            </CardHeader>
            <CardContent className='grid grid-cols-1 gap-4'>
              <div className='col-span-1 grid grid-cols-6 gap-4'>
                <div className='col-span-2 grid gap-2'>
                  <Label htmlFor='name'>Nome</Label>
                  <Input id='name' {...register('nome')} />
                  <FormMessageError error={errors.nome?.message} />
                </div>
                <div className='col-span-2 grid gap-2'>
                  <Label htmlFor='name'>Idade</Label>
                  <Input id='name' {...register('idade')} />
                  <FormMessageError error={errors.idade?.message} />
                </div>
                <div className='col-span-2 grid gap-2'>
                  <Label htmlFor='name'>Data de ingresso</Label>
                  <Input id='name' {...register('dataIngresso')} />
                  <FormMessageError error={errors.dataIngresso?.message} />
                </div>
                <div className='col-span-2 grid gap-2'>
                  <Label htmlFor='name'>Turma</Label>
                  <Input id='name' {...register('turma')} />
                  <FormMessageError error={errors.turma?.message} />
                </div>
                <div className='col-span-2 grid gap-2'>
                  <Label htmlFor='name'>Graduação</Label>
                  <Input id='name' {...register('graduacao')} />
                  <FormMessageError error={errors.graduacao?.message} />
                </div>
                <div className='col-span-2 grid gap-2'>
                  <Label htmlFor='name'>Professor</Label>
                  <Input id='name' {...register('professor')} />
                  <FormMessageError error={errors.professor?.message} />
                </div>
                <div className='col-span-2 grid gap-2'>
                  <Label htmlFor='name'>Mes</Label>
                  <Input id='name' {...register('mes')} />
                  <FormMessageError error={errors.mes?.message} />
                </div>
                <div className='col-span-2 grid gap-2'>
                  <Label htmlFor='name'>Presença</Label>
                  <Input id='name' {...register('presenca')} />
                  <FormMessageError error={errors.presenca?.message} />
                </div>
                <div className='col-span-2 grid gap-2'>
                  <Label htmlFor='name'>Faltas</Label>
                  <Input id='name' {...register('faltas')} />
                  <FormMessageError error={errors.faltas?.message} />
                </div>
                <div className='col-span-2 grid gap-2'>
                  <Label htmlFor='name'>Situação</Label>
                  <Input id='name' {...register('situacao')} />
                  <FormMessageError error={errors.situacao?.message} />
                </div>
              </div>
              <Separator className='grid-cols-1' />
              <div className='col-span-1 grid grid-cols-6 gap-4'>
                <div className='col-span-2 grid gap-2'>
                  <Label htmlFor='name'>Poomsee</Label>
                  <Input id='name' {...register('poomsee')} />
                  <FormMessageError error={errors.poomsee?.message} />
                </div>
                <div className='col-span-2 grid gap-2'>
                  <Label htmlFor='name'>Seban</Label>
                  <Input id='name' {...register('seban')} />
                  <FormMessageError error={errors.seban?.message} />
                </div>
                <div className='col-span-2 grid gap-2'>
                  <Label htmlFor='name'>Explosão</Label>
                  <Input id='name' {...register('explosao')} />
                  <FormMessageError error={errors.explosao?.message} />
                </div>
                <div className='col-span-2 grid gap-2'>
                  <Label htmlFor='name'>Físico</Label>
                  <Input id='name' {...register('fisico')} />
                  <FormMessageError error={errors.fisico?.message} />
                </div>
                <div className='col-span-2 grid gap-2'>
                  <Label htmlFor='name'>Potencia</Label>
                  <Input id='name' {...register('potencia')} />
                  <FormMessageError error={errors.potencia?.message} />
                </div>
                <div className='col-span-2 grid gap-2'>
                  <Label htmlFor='name'>Resistencia</Label>
                  <Input id='name' {...register('resistencia')} />
                  <FormMessageError error={errors.resistencia?.message} />
                </div>
                <div className='col-span-2 grid gap-2'>
                  <Label htmlFor='name'>Combate/Luta</Label>
                  <Input id='name' {...register('combate')} />
                  <FormMessageError error={errors.combate?.message} />
                </div>
                <div className='col-span-2 grid gap-2'>
                  <Label htmlFor='name'>Esforço</Label>
                  <Input id='name' {...register('esforco')} />
                  <FormMessageError error={errors.esforco?.message} />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => {}}>
                <Save className='size-4' />
                Gerar relatório
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
