import { Classes } from '@/pages/classes'
import { Classrooms } from '@/pages/classrooms'
import { CreateClassroom } from '@/pages/classrooms/create-classrooom'
import { SignIn } from '@/pages/sign-in'
import { Students } from '@/pages/students'
import { Trainings } from '@/pages/trainings'
import { BrowserRouter, Route, Routes } from 'react-router-dom'


function RoutesApp() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<SignIn />} />
				<Route path='/classes' element={<Classes />} />
				<Route path='/classrooms' element={<Classrooms />} />
				<Route path='/classrooms/register' element={<CreateClassroom />} />
				<Route path='/students' element={<Students />} />
				<Route path='/trainings' element={<Trainings />} />
			</Routes>
		</BrowserRouter>
	)
}

export default RoutesApp