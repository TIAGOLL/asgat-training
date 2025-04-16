import { CreateClassesForm } from '@/components/forms/create-classes-form';
import { Sidebar } from '@/components/sidebar';

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
