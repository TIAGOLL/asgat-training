import { Circle, Clipboard, Dumbbell, GraduationCap, Menu, Power, Users, ScrollText } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';

type Tab = {
  name: string;
  icon: React.ElementType;
  links: {
    name: string;
    to: string;
  }[];
};

export function Sidebar() {
  const tabs: Tab[] = [
    {
      name: 'Aulas',
      icon: GraduationCap,
      links: [
        { name: 'Ver aulas', to: '/classes' },
        { name: 'Cadastrar aulas', to: '/classes/create' },
      ],
    },
    {
      name: 'Alunos',
      icon: Users,
      links: [
        { name: 'Ver alunos', to: '/students' },
        { name: 'Cadastrar alunos', to: '/students/create' },
      ],
    },
    {
      name: 'Turmas',
      icon: Clipboard,
      links: [
        { name: 'Ver turmas', to: '/classrooms' },
        { name: 'Cadastrar turma', to: '/classrooms/create' },
      ],
    },
    {
      name: 'Treinos',
      icon: Dumbbell,
      links: [
        { name: 'Ver treinos', to: '/trainings' },
        { name: 'Cadastrar treino', to: '/trainings/create' },
      ],
    },
  ];

  const [isMobile, setIsMobile] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderMenuContent = () => (
    <div className='flex h-full w-full flex-col bg-[#213046] p-4 text-white dark:bg-[#334155]'>
      <div className='flex flex-col items-center space-y-3'>
        <Avatar className='h-15 w-15'>
          <AvatarImage src='/logo.png' />
          <AvatarFallback>ASGAT</AvatarFallback>
        </Avatar>
        <h2 className='font-serif text-xl font-semibold'>ASGAT</h2>
      </div>
      <nav className='flex flex-1 flex-col justify-between'>
        <Accordion type='single' collapsible className='mt-6 flex w-full flex-col gap-3'>
          {tabs.map((tab) => {
            const currentPath = window.location.pathname;
            const active = tab.links.some((link) => currentPath.includes(link.to));

            return (
              <AccordionItem
                value={tab.name}
                className='flex flex-col gap-2 border-0'
                key={tab.name}>
                <AccordionTrigger
                  className={`flex items-center space-x-3 rounded-lg p-2 text-white duration-400 ${
                    active ? '!bg-white font-semibold text-[#334155]' : 'hover:bg-slate-800'
                  }`}>
                  <tab.icon className='size-6 !rotate-none animate-none' />
                  <span className='text-lg'>{tab.name}</span>
                </AccordionTrigger>
                <AccordionContent className='animate-in fade-in-50 slide-in-from-top-10 data-[state=open]:animate-out data-[state=closed]:fade-out-50 data-[state=closed]:slide-out-to-bottom-10 m-0 flex flex-col space-y-1 border-0 py-0.5'>
                  {tab.links.map((link) => {
                    return (
                      <NavLink
                        to={link.to}
                        className='flex flex-row items-center gap-2 text-lg hover:underline'
                        key={link.name}>
                        <Circle className='size-2' />
                        {link.name}
                      </NavLink>
                    );
                  })}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
        <Button
          onClick={() => {
            localStorage.removeItem('token');
            window.location.href = '/';
          }}
          variant='destructive'
          type='button'
          className='flex w-[10rem] place-items-center space-x-2 hover:cursor-pointer'>
          <Power />
          Sair
        </Button>
      </nav>
    </div>
  );

  return (
    <>
      {isMobile ? (
        <div className='md:hidden'>
          <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} direction='left'>
            <DrawerTrigger asChild className='size-10'>
              <Button variant='ghost' className='fixed m-2'>
                <Menu className='size-10' />
              </Button>
            </DrawerTrigger>
            <DrawerContent>{renderMenuContent()}</DrawerContent>
          </Drawer>
        </div>
      ) : (
        <div className='hidden h-screen w-[17rem] md:flex'>{renderMenuContent()}</div>
      )}
    </>
  );
}
