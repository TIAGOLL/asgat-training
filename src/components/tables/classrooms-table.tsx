import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function DataTableClassrooms() {
	const clasrooms = [
		{
			id: 1,
			name: "Sala 01",
			day: "Segunda-feira",
			time: "08:00 - 10:00",
		},
		{
			id: 2,
			name: "Sala 02",
			day: "Terça-feira",
			time: "10:00 - 12:00",
		},
		{
			id: 3,
			name: "Sala 03",
			day: "Quarta-feira",
			time: "14:00 - 16:00",
		},
		{
			id: 4,
			name: "Sala 04",
			day: "Quinta-feira",
			time: "16:00 - 18:00",
		},
		{
			id: 5,
			name: "Sala 05",
			day: "Sexta-feira",
			time: "18:00 - 20:00",
		},
		{
			id: 6,
			name: "Sala 06",
			day: "Sábado",
			time: "20:00 - 22:00",
		},
		{
			id: 7,
			name: "Sala 07",
			day: "Domingo",
			time: "22:00 - 24:00",
		},
		{
			id: 8,
			name: "Sala 08",
			day: "Segunda-feira",
			time: "08:00 - 10:00",
		},
		{
			id: 9,
			name: "Sala 09",
			day: "Terça-feira",
			time: "10:00 - 12:00",
		},
		{
			id: 10,
			name: "Sala 10",
			day: "Quarta-feira",
			time: "14:00 - 16:00",
		},
	];

	return (
		<div className='w-full !rounded-lg border'>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className='font-bold'>Nome</TableHead>
						<TableHead className='font-bold'>Dia</TableHead>
						<TableHead className='font-bold'>Horarios</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{clasrooms.map((classroom) => (
						<TableRow key={classroom.name}>
							<TableCell className='font-medium'>{classroom.name}</TableCell>
							<TableCell className='font-medium'>{classroom.day}</TableCell>
							<TableCell className='font-medium'>{classroom.time}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
