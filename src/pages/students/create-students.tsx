import { CreateStudentsForm } from '@/pages/students/components/create-students-form';
import { Sidebar } from '@/components/sidebar';

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
