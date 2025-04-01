import { zodResolver } from "@hookform/resolvers/zod"
import type { z } from "zod"
import { createClasroomSchema } from "./validations/create-classroom-schema"
import { useForm } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
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
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Check, ChevronsUpDown, Save } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { studentSchema } from './validations/students';

type CreateClasroomSchema = z.infer<
  typeof createClasroomSchema
>
type StudentSchema = z.infer<
  typeof studentSchema
>

export function CreateClassroomForm() {
  const [studentsList] = useState(
    [
      {
        id: "1",
        name: "James Lucas",
        age: 34,
        contact: "(11) 99999-9999",
        belt: "black belt",
      },
      {
        id: "2",
        name: "Lucas",
        age: 22,
        contact: "(11) 99999-9999",
        belt: "Red belt",
      },
      {
        id: "3",
        name: "Jonas",
        age: 18,
        contact: "(11) 99999-9999",
        belt: "White belt",
      },
      {
        id: "4",
        name: "João",
        age: 32,
        contact: "(11) 99999-9999",
        belt: "Blue belt",
      },
      {
        id: "5",
        name: "Maria",
        age: 25,
        contact: "(11) 99999-9999",
        belt: "Yellow belt",
      },
      {
        id: "6",
        name: "Ana",
        age: 28,
        contact: "(11) 99999-9999",
        belt: "Green belt",
      },
      {
        id: "7",
        name: "Carlos",
        age: 30,
        contact: "(11) 99999-9999",
        belt: "Brown belt",
      },
      {
        id: "8",
        name: "Fernanda",
        age: 27,
        contact: "(11) 99999-9999",
        belt: "Purple belt",
      },
      {
        id: "9",
        name: "Roberto",
        age: 29,
        contact: "(11) 99999-9999",
        belt: "Orange belt",
      },
      {
        id: "10",
        name: "Patrícia",
        age: 31,
        contact: "(11) 99999-9999",
        belt: "Gray belt",
      },
      {
        id: "11",
        name: "Juliana",
        age: 26,
        contact: "(11) 99999-9999",
        belt: "Pink belt",
      },
      {
        id: "12",
        name: "Ricardo",
        age: 33,
        contact: "(11) 99999-9999",
        belt: "Black belt",
      },
      {
        id: "13",
        name: "Tatiane",
        age: 24,
        contact: "(11) 99999-9999",
        belt: "Red belt",
      },
    ]
  )
  const [selectedStudents, setSelectedStudents] = useState<StudentSchema[]>([])
  const [open, setOpen] = useState<boolean>(false)

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<CreateClasroomSchema>({
    resolver: zodResolver(createClasroomSchema),
  })

  async function createClassroom({ day, local, name, time, students }: CreateClasroomSchema) {
  }

  return (
    <form onSubmit={handleSubmit(createClassroom)} className="grid grid-cols-6 w-auto items-center justify-center gap-4">
      <div className="col-span-2 flex flex-col items-start justify-start gap-2">
        <Label htmlFor="name">
          Nome da turma
        </Label>
        <Input
          type="text"
          id="name"
          placeholder="Nome da turma"
          {...register("name")}
          className={`w-full h-10 rounded-md px-2 ${errors.name ? "border-red-500" : ""}`}
        />
        {errors.name && (
          <span className="text-red-500 text-sm">{errors.name.message}</span>
        )}
      </div>

      <div className="col-span-2 flex flex-col items-start justify-start gap-2">
        <Label htmlFor="local">
          Local
        </Label>
        <Input
          type="text"
          id="local"
          placeholder="Local"
          {...register("local")}
          className={`w-full h-10 rounded-md px-2 ${errors.local ? "border-red-500" : ""
            }`}
        />
        {errors.local && (
          <span className="text-red-500 text-sm">{errors.local.message}</span>
        )}
      </div>

      <div className="col-span-1 flex flex-col items-start justify-start gap-2">
        <Label htmlFor="day">
          Dia
        </Label>
        <Input
          type="date"
          id="day"
          {...register("day")}
          className={`w-full h-10 rounded-md px-2 ${errors.day ? "border-red-500" : ""
            }`}
        />
        {errors.day && (
          <span className="text-red-500 text-sm">{errors.day.message}</span>
        )}
      </div>

      <div className="col-span-1 flex flex-col items-start justify-start gap-2">
        <Label htmlFor="time">
          Horário
        </Label>
        <Input
          type="time"
          id="time"
          {...register("time")}
          className={`w-full h-10 rounded-md px-2 ${errors.time ? "border-red-500" : ""
            }`}
        />
        {errors.time && (
          <span className="text-red-500 text-sm">{errors.time.message}</span>
        )}
      </div>

      <Card className="col-span-6 flex flex-col items-center justify-start gap-2">
        <CardHeader className="justify-center flex flex-col items-center">
          <CardTitle>Alunos</CardTitle>
          <CardDescription>Escolha os alunos que irão fazer parte da turma</CardDescription>
        </CardHeader>
        <CardContent className="w-full grid grid-cols-3 items-center justify-between">
          <div className="col-span-3 flex flex-col items-center justify-start gap-2 mt-6">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="flex w-[15rem] justify-between"
                >
                  Selecione os alunos...
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Command>
                  <CommandInput placeholder="Pesquise..." className="h-9" />
                  <CommandList>
                    <CommandEmpty>Aluno não encontrado.</CommandEmpty>
                    <CommandGroup>
                      {studentsList.map((student) => (
                        <CommandItem
                          key={student.id}
                          value={student.name}
                          onSelect={() => {
                            setSelectedStudents((prev) => {
                              const alreadySelected = prev.find((s) => s.id === student.id)
                              if (alreadySelected) {
                                return prev.filter((s) => s.id !== student.id)
                              } else {
                                return [...prev, student]
                              }
                            })
                          }}
                        >
                          {student.name}
                          <Check
                            className={cn(
                              "ml-auto",
                              selectedStudents.find((s) => s.id === student.id) ? "opacity-100" : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <div className="mt-6 col-span-3 w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Idade</TableHead>
                  <TableHead>Contato</TableHead>
                  <TableHead>Faixa</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedStudents.map((selectedStudent) => (
                  <TableRow key={selectedStudent.id}>
                    <TableCell >{selectedStudent.name}</TableCell>
                    <TableCell>{selectedStudent.age}</TableCell>
                    <TableCell>{selectedStudent.contact}</TableCell>
                    <TableCell>{selectedStudent.belt}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Total de alunos</TableCell>
                  <TableCell className="text-right">{selectedStudents.length}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </CardContent>
      </Card>
      <div className="col-span-6 grid place-items-center gap-4 mt-6">
        <Button type="submit" className="w-[10rem] gap-2">
          <Save className="size-4"/>
          Salvar
        </Button>
      </div>
    </form>
  )
}