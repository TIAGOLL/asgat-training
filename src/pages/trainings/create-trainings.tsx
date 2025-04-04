import { Sidebar } from '@/components/sidebar'
import { CreateTrainingForm } from '@/forms/create-training-form'

export function CreateTraining() {
	return (
		<div className='flex flex-row'>
			<Sidebar />
			<div className='flex w-[calc(80vw)] flex-col items-center justify-center'>
				<CreateTrainingForm />
			</div>
		</div>
	)
}
