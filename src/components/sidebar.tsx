import { Clipboard, Dumbbell, GraduationCap, Power, Users, } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from '@/components/ui/button';

export function Sidebar() {

  type Tab = {
    name: string;
    icon: React.ElementType;
    href: string;
  }

  const tabs: Tab[] = [
    {
      name: 'Aulas',
      icon: GraduationCap,
      href: '/classes',
    },
    {
      name: 'Alunos',
      icon: Users,
      href: '/students',
    },
    {
      name: 'Turmas',
      icon: Clipboard,
      href: '/classrooms',
    },
    {
      name: 'Treinos',
      icon: Dumbbell,
      href: '/trainings',
    }
  ]

  return (
    <div className="h-screen w-[15rem] bg-indigo-600 text-white flex flex-col p-4">
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
        <div className="mt-10 space-y-2">
          {
            tabs.map((tab) => {
              const active = window.location.pathname === tab.href

              return (
                <NavLink to={tab.href} className={`flex items-center space-x-3 p-2 rounded-lg  cursor-pointer ${active ? "!bg-white text-indigo-600 font-semibold" : "hover:bg-indigo-500"}`}>
                  {<tab.icon />}
                  <span>{tab.name}</span>
                </NavLink>
              )
            })
          }
        </div>
        <div>

          <Link rel="stylesheet" to="/">
            <Button variant="destructive" type="button" className="w-[10rem] flex place-items-center space-x-2 hover:cursor-pointer">
              <Power />
              Sair
            </Button>
          </Link>
        </div>
      </nav>
    </div>
  )
}
