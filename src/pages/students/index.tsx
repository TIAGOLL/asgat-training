import { Sidebar } from '@/components/sidebar';
import { DataTableStudents } from '@/components/tables/students-table';

export function Students() {
  return (
    <div className='flex flex-row'>
      <Sidebar />
      <div className='flex w-full flex-col items-center justify-start'>
        <h1>Alunos</h1>
        <div className='flex w-[calc(80vw)] flex-col items-center justify-start'>
          <DataTableStudents />
        </div>
      </div>
    </div>
  );
}
