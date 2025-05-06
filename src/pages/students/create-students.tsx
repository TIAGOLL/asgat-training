import { Sidebar } from '@/components/sidebar';
import { CreateStudentsForm } from '@/pages/students/components/create-students-form';

export function CreateStudents() {
  return (
    <div className='flex flex-row'>
      <Sidebar />
      <div className='mt-10 flex w-full flex-col items-center justify-start'>
        <CreateStudentsForm />
      </div>
    </div>
  );
}
