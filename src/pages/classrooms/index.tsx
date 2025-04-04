import { Sidebar } from "@/components/sidebar";
import { DataTableClassrooms } from "@/components/tables/classrooms-table";

export function Classrooms() {
	return (
		<div className='flex flex-row'>
			<Sidebar />
			<div className='flex w-full flex-col items-center justify-start'>
				<h1>Turmas</h1>
				<div className='flex w-[calc(80vw)] flex-col items-center justify-start'>
					<DataTableClassrooms />
				</div>
			</div>
		</div>
	);
}
