import { Sidebar } from "@/components/sidebar";
import { DataTableStudents } from "@/components/tables/students-table";

export function Students() {

  return (
    <div className="flex flex-row">
      <Sidebar />
      <div className="flex flex-col w-full items-center justify-start">
        <h1>Alunos</h1>
        <div className="flex flex-col w-[calc(80vw)] items-center justify-start">
          <DataTableStudents />
        </div>
      </div>
    </div>
  )
}