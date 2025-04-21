import { Sidebar } from '@/components/sidebar';
import { CreateClassesForm } from '@/pages/classes/components/create-classes-form';

export function CreateClasses() {
  return (
    <div className='flex flex-row'>
      <Sidebar />
      <div className='mt-10 flex w-full flex-col items-center justify-start'>
        <CreateClassesForm />
      </div>
    </div>
  );
}
