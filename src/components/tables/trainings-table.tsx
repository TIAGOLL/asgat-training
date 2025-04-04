import { useState } from "react";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function DataTableTrainings() {
	const [trainings] = useState([
		{
			name: "Treino 1",
			type: "Resistência",
		},
		{
			name: "Treino 2",
			type: "Força",
		},
		{
			name: "Treino 3",
			type: "HIIT",
		},
		{
			name: "Treino 4",
			type: "Flexibilidade",
		},
		{
			name: "Treino 5",
			type: "Resistência",
		},
		{
			name: "Treino 6",
			type: "Força",
		},
		{
			name: "Treino 7",
			type: "HIIT",
		},
		{
			name: "Treino 8",
			type: "Flexibilidade",
		},
	]);

	return (
		<div className='w-full !rounded-lg border'>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className='font-bold'>Nome</TableHead>
						<TableHead className='font-bold'>Tipo</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{trainings.map((training) => (
						<TableRow key={training.name}>
							<TableCell className='font-medium'>{training.name}</TableCell>
							<TableCell className='font-medium'>{training.type}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
