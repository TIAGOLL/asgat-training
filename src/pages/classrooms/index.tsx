import { Sidebar } from "@/components/sidebar";
import { DataTableClassrooms } from "@/components/tables/classrooms-table";

export function Classrooms() {

  return (
    <div className="flex flex-row">
      <Sidebar />
      <div className="flex flex-col w-full items-center justify-start">
        <h1>Turmas</h1>
        <div className="flex flex-col w-[calc(80vw)] items-center justify-start">
          <DataTableClassrooms />
        </div>
      </div>
    </div>
  )
}