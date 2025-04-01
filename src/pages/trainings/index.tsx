import { Sidebar } from "@/components/sidebar";
import { DataTableTrainings } from "@/components/tables/trainings-table";

export function Trainings() {

  return (
    <div className="flex flex-row">
      <Sidebar />
      <div className="flex flex-col w-full items-center justify-start">
        <h1>Turmas</h1>
        <div className="flex flex-col w-[calc(80vw)] items-center justify-start">
          <DataTableTrainings />
        </div>
      </div>
    </div>
  )
}