import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Classes } from '@/pages/classes';
import { Classrooms } from '@/pages/classrooms';
import { CreateClassroom } from '@/pages/classrooms/create-classrooom';
import { SignIn } from '@/pages/sign-in';
import { Students } from '@/pages/students';
import { CreateStudents } from '@/pages/students/create-students';
import { Trainings } from '@/pages/trainings';
import { CreateTraining } from '@/pages/trainings/create-trainings';

function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/classes' element={<Classes />} />
        <Route path='/classrooms' element={<Classrooms />} />
        <Route path='/classrooms/register' element={<CreateClassroom />} />
        <Route path='/trainings/register' element={<CreateTraining />} />
        <Route path='/students' element={<Students />} />
        <Route path='/students/register' element={<CreateStudents />} />
        <Route path='/trainings' element={<Trainings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesApp;
