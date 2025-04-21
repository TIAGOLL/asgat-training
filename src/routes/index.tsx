import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Classes } from '@/pages/classes';
import { AttendanceList } from '@/pages/classes/attendance-list';
import { CreateClasses } from '@/pages/classes/create-classes';
import { FinalNotes } from '@/pages/classes/final-notes';
import { NotesByStudent } from '@/pages/classes/notes-by-student';
import { UpdateClasses } from '@/pages/classes/update-classes';
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
        <Route path='/classes/create' element={<CreateClasses />} />
        <Route path='/classes/:id' element={<UpdateClasses />} />
        <Route path='/classes/attendance-list/:id' element={<AttendanceList />} />
        <Route path='/classes/notes/:id' element={<NotesByStudent />} />
        <Route path='/classes/final-notes/:id' element={<FinalNotes />} />

        <Route path='/classrooms' element={<Classrooms />} />
        <Route path='/classrooms/create' element={<CreateClassroom />} />

        <Route path='/trainings' element={<Trainings />} />
        <Route path='/trainings/create' element={<CreateTraining />} />

        <Route path='/students' element={<Students />} />
        <Route path='/students/create' element={<CreateStudents />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesApp;
