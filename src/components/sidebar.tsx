import { Circle, Clipboard, Dumbbell, GraduationCap, Power, Users, } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@/components/ui/accordion"

export function Sidebar() {

  type Tab = {
    name: string;
    icon: React.ElementType;
    links: {
      name: string;
      to: string;
    }[];
  };


  const tabs: Tab[] = [
    {
      name: 'Aulas',
      icon: GraduationCap,
      links: [
        { name: "Ver aulas", to: "/classes" },
        { name: "Cadastrar alunos", to: "/classes/register" }
      ]
    },
    {
      name: "Alunos", icon: Users, links: [
        { name: "Ver alunos", to: "/students" },
        { name: "Cadastrar alunos", to: "/students/register" }
      ]
    },
    {
      name: 'Turmas',
      icon: Clipboard,
      links: [
        { name: "Ver turmas", to: "/classrooms" },
        { name: "Cadastrar turma", to: "/classrooms/register" }
      ]
    },
    {
      name: 'Treinos',
      icon: Dumbbell,
      links: [
        { name: "Ver treinos", to: "/trainings" },
        { name: "Cadastrar treino", to: "/trainings/register" }
      ]
    },
  ]

  return (
    <div className="h-screen w-[17rem] bg-indigo-600 text-white flex flex-col p-4">
      <div className="flex flex-col space-y-3 items-center">
        <Avatar className="w-15 h-15">
          <AvatarImage src="logo.png" />
          <AvatarFallback>
            ASGAT
          </AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-semibold font-serif">ASGAT</h2>
      </div>
      <nav className="flex-1 flex flex-col justify-between">
        <Accordion type="single" collapsible className="w-full mt-10 flex flex-col gap-3">
          {
            tabs.map((tab) => {
              const active = window.location.pathname === tab.links[0].to || window.location.pathname === tab.links[1].to

              return (
                <AccordionItem value={tab.name} className="gap-2 flex flex-col border-0" key={tab.name}>
                  <AccordionTrigger className={`flex items-center space-x-3 p-2 rounded-lg !no-underline cursor-pointer duration-400 ${active ? "!bg-white text-indigo-600 font-semibold" : "hover:bg-indigo-500"}`}>
                    <tab.icon className="size-6 animate-none !rotate-none" />
                    <span className="text-lg">{tab.name}</span>
                  </AccordionTrigger >
                  <AccordionContent className="border-0 m-0 py-0.5 space-y-1 flex flex-col animate-in fade-in-50 slide-in-from-top-10 data-[state=open]:animate-out data-[state=closed]:fade-out-50 data-[state=closed]:slide-out-to-bottom-10">
                    {
                      tab.links.map((link) => {
                        return (
                          <NavLink to={link.to} className="hover:underline text-lg flex flex-row items-center gap-2" key={link.name}>
                            <Circle className="size-2" />
                            {link.name}
                          </NavLink>
                        )
                      })
                    }
                  </AccordionContent>
                </AccordionItem>
              )
            })
          }
        </Accordion>
        <Link rel="stylesheet" to="/">
          <Button variant="destructive" type="button" className="w-[10rem] flex place-items-center space-x-2 hover:cursor-pointer">
            <Power />
            Sair
          </Button>
        </Link>
      </nav>
    </div>
  )
}
