import { CreateClassroomForm } from '@/pages/classrooms/components/create-classroom-form';
import { Sidebar } from '@/components/sidebar';

export function CreateClassroom() {
  return (
    <div className='flex flex-row'>
      <Sidebar />
      <div className='mt-10 flex w-full flex-col items-center justify-start'>
        <CreateClassroomForm />
      </div>
    </div>
  );
}
