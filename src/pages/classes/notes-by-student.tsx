import { Sidebar } from '@/components/sidebar';

import { NotesByStudentForm } from './components/notes-by-student-form';

export function NotesByStudent() {
  return (
    <div className='flex flex-row'>
      <Sidebar />
      <div className='mt-10 flex w-full flex-col items-center justify-start'>
        <NotesByStudentForm />
      </div>
    </div>
  );
}
