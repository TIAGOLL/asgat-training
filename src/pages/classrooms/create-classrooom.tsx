import { Sidebar } from "@/components/sidebar";
import { CreateClassroomForm } from "@/forms/create-classroom-form";

export function CreateClassroom() {
	return (
		<div className='flex flex-row'>
			<Sidebar />
			<div className='flex w-full flex-col items-center justify-start'>
				<h1>Turmas</h1>
				<div className='flex w-[calc(80vw)] flex-col items-center justify-start'>
					<CreateClassroomForm />
				</div>
			</div>
		</div>
	);
}
