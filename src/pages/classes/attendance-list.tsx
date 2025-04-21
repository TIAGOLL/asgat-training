import { Sidebar } from '@/components/sidebar';

import { AttendanceListForm } from './components/attendance-list-form';

export function AttendanceList() {
  return (
    <div className='flex flex-row'>
      <Sidebar />
      <div className='mt-10 flex w-full flex-col items-center justify-start'>
        <AttendanceListForm />
      </div>
    </div>
  );
}
