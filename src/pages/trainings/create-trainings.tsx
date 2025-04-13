import { CreateTrainingForm } from '@/components/forms/create-training-form';
import { Sidebar } from '@/components/sidebar';

export function CreateTraining() {
  return (
    <div className='flex flex-row'>
      <Sidebar />
      <div className='mt-10 flex w-full flex-col items-center justify-start'>
        <CreateTrainingForm />
      </div>
    </div>
  );
}
