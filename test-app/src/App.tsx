import React, { FC } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import OrdersPage from './pages/orders/OrdersPage'

const App: FC = () => {
	return (
		<div className='App'>
			<OrdersPage />
			<ToastContainer />
		</div>
	)
}

export default App
