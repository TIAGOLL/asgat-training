import { Sidebar } from "@/components/sidebar";
import { CreateTrainingForm } from "@/forms/create-training-form";

export function CreateTraining() {

  return (
    <div className="flex flex-row">
      <Sidebar />
      <div className="flex flex-col w-[calc(80vw)] justify-center items-center">
        <CreateTrainingForm />
      </div>
    </div>
  )
}