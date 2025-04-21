import { Sidebar } from '@/components/sidebar';
import { UpdateClassesForm } from '@/pages/classes/components/update-classes-form';

export function UpdateClasses() {
  return (
    <div className='flex flex-row'>
      <Sidebar />
      <div className='mt-10 flex w-full flex-col items-center justify-start'>
        <UpdateClassesForm />
      </div>
    </div>
  );
}
