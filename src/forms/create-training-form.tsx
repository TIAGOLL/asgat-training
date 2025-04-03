import { useState } from "react"
import type { z } from "zod"
import { createTrainingSchema } from "./validations/create-classroom-schema copy"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { PlusCircle, Save } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"

type CreateTrainingSchema = z.infer<
  typeof createTrainingSchema
>

export function CreateTrainingForm() {
  const [exercisesList, setExercisesList] = useState<string[]>([])

  const [trainingTypes] = useState([
    {
      id: 1,
      name: "Treino de força",
    },
    {
      id: 2,
      name: "Treino de resistência",
    },
    {
      id: 3,
      name: "Treino de flexibilidade",
    },
    {
      id: 4,
      name: "Treino de velocidade",
    },
  ])

  const [exercise, setExercise] = useState("")

  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
    setError,
    clearErrors
  } = useForm<CreateTrainingSchema>({
    resolver: zodResolver(createTrainingSchema),
  })

  async function createTraining({ type, exercises }: CreateTrainingSchema) {
  }

  return (
    <form onSubmit={handleSubmit(createTraining)} className="grid grid-cols-6 gap-4 w-full place-items-center">
      <Card className="col-span-6 gap-2 w-8/12">
        <CardHeader>
          <CardTitle>Criar treino</CardTitle>
          <CardDescription>Crie treinos para aplicar aos alunos</CardDescription>
        </CardHeader>
        <CardContent className="grid-cols-6 mt-10 grid space-y-7">
          <div className="col-span-6 grid gap-2">
            <Label>Tipo de treino</Label>
            <Select onValueChange={(value) => setValue("type", value)} defaultValue="">
              <SelectTrigger {...register("type")}>
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
              <SelectContent>
                {
                  trainingTypes.map((training) => (
                    <SelectItem key={training.id} value={training.name}>
                      {training.name}
                    </SelectItem>
                  ))
                }
              </SelectContent>
            </Select>
            {errors.type && (
              <span className="text-red-500 text-sm">{errors.type.message}</span>
            )}
          </div>
          <div className="col-span-6 grid gap-2 grid-cols-4">
            <Label htmlFor="training" className="col-span-4">Treino</Label>
            <div className="flex flex-row gap-2 col-span-2">
              <Input id="training" placeholder="Flexões - 10 repetições" className="w-1/2" onChange={(e) => setExercise(e.target.value)} value={exercise} />
              <Button type="button" className="w-4/12" onClick={() => {
                if (exercise.length < 3) {
                  return setError("exercises", {
                    message: "O treino não pode ter menos que 3 caracteres",
                    type: "minLength",
                  })
                }
                
                if (exercise.length >= 3) {
                  clearErrors("exercises")
                  setExercisesList((prev) => {
                    return [...prev, exercise]
                  })
                  setValue("exercises", exercisesList)
                  setExercise("")
                }
              }}>
                <PlusCircle />
                Adicionar
              </Button>
            </div>
          </div>
          {errors.exercises && (
            <span className="text-red-500 text-sm col-span-6">{errors.exercises.message}</span>
          )}
          <div className="col-span-6 gap-2">
            <Table className="col-span-6">
              <TableHeader>
                <TableRow>
                  <TableHead>Nome do treino</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {exercisesList.map((exercise) => (
                  <TableRow key={exercise}>
                    <TableCell >{exercise}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Total de exercícios</TableCell>
                  <TableCell className="text-right">{exercisesList.length}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </CardContent>
      </Card>
      <div className="col-span-6 grid place-items-center gap-4 mt-6">
        <Button type="submit" className="w-[10rem] gap-2">
          <Save className="size-4" />
          Salvar
        </Button>
      </div>
    </form >
  )
}