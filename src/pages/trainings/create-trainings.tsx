import { Sidebar } from '@/components/sidebar';
import { CreateTrainingForm } from '@/pages/trainings/components/create-training-form';

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
