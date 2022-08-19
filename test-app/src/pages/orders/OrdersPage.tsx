import { FC, useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles'
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'
import Button from '@mui/material/Button'
import { isBefore } from 'date-fns'
import { Chip, TextField } from '@mui/material'
import GeneralTable, { Column } from '../../storybook/components/table/Table'
import orderRequest from '../../api/order/OrderRequest'
import { OrderModel } from '../../api/order/OrderModel'
import DatePicker from '../../storybook/components/datePicker/DatePicker'
import UserModel from '../../api/user/UserModel'
import userRequest from '../../api/user/UserRequest'
import GeneralAutocomplete, {
	SelectOption,
} from '../../storybook/components/autocomplete/Autocomplete'
import useProductsStatistics from './hooks/useProductsStatistics'
import { Statistic } from '../../api/product/ProductModel'
import DateFormats from '../../utils/date.formats'

const useStyles = makeStyles({
	mainWrap: {
		boxSizing: 'border-box',
		padding: 20,
		display: 'flex',
		width: '100%',
		flexDirection: 'column',
		'& .headerWrap': {
			width: '100%',
			height: 10,
			'& .loader': {
				width: '100%',
			},
		},
		'& .contentWrap': {
			marginTop: 20,
			display: 'flex',
			width: '100%',
			'& .content': {
				flexBasis: '100%',

				'& .tables': {
					'& .filters': {
						display: 'flex',
						gap: 10,
					},
					'& .table': {
						marginTop: 30,
						'& .title': {
							margin: '10px 0',
						},
					},
				},
			},
		},
	},
})

const OrdersPage: FC = () => {
	const classes = useStyles()
	const [orders, setOrders] = useState<OrderModel[]>([])
	const [isLoading, setIsLoading] = useState(false)
	const [startDate, setStartDate] = useState(new Date())
	const [endDate, setEndDate] = useState(new Date())
	const [selectedUser, setSelectedUser] = useState<SelectOption | null>(null)
	const [availableUsers, setAvailableUsers] = useState<UserModel[]>([])
	const productsStatistics = useProductsStatistics(orders)
	const [search, setSearch] = useState('')
	const filteredProductsStatistics = productsStatistics.filter(item =>
		item.name.toLowerCase().includes(search.toLowerCase())
	)

	const columns: Column[] = [
		{
			id: 'id',
			label: 'ID',
		},
		{
			id: 'name',
			label: 'Товар',
		},
		{
			id: 'processingCount',
			label: 'В Обработке',
			// eslint-disable-next-line react/no-unstable-nested-components
			format: (value: Statistic) => (
				<Typography>
					{value.count} <Chip label={`${value.percent}%`} />
				</Typography>
			),
		},
		{
			id: 'acceptedCount',
			label: 'Принятые',
			// eslint-disable-next-line react/no-unstable-nested-components
			format: (value: Statistic) => (
				<Typography>
					{value.count} <Chip label={`${value.percent}%`} />
				</Typography>
			),
		},
		{
			id: 'rejectedCount',
			label: 'Отклоненные',
			// eslint-disable-next-line react/no-unstable-nested-components
			format: (value: Statistic) => (
				<Typography>
					{value.count} <Chip label={`${value.percent}%`} />
				</Typography>
			),
		},
		{
			id: 'invalidCount',
			label: 'Невалидные',
			// eslint-disable-next-line react/no-unstable-nested-components
			format: (value: Statistic) => (
				<Typography>
					{value.count} <Chip label={`${value.percent}%`} />
				</Typography>
			),
		},
		{
			id: 'unknownCount',
			label: 'Остальные',
			// eslint-disable-next-line react/no-unstable-nested-components
			format: (value: Statistic) => (
				<Typography>
					{value.count} <Chip label={`${value.percent}%`} />
				</Typography>
			),
		},
	]

	const loadOrders = (
		userLogin: string,
		startDateOrigin: Date,
		endDateOrigin: Date
	) => {
		setIsLoading(true)

		orderRequest
			.getByUser(userLogin, {
				extra: {
					startDate: startDateOrigin.toISOString(),
					endDate: endDateOrigin.toISOString(),
				},
			})
			.then(({ resources }) => {
				setOrders(resources || [])
			})
			.finally(() => {
				setIsLoading(false)
			})
	}

	useEffect(() => {
		/** @dima todo: fix meta */
		userRequest.get().then(({ meta }) => {
			setAvailableUsers(meta)
		})
	}, [])

	return (
		<div className={classes.mainWrap}>
			<div className='headerWrap'>
				{isLoading && <LinearProgress color='secondary' className='loader' />}
			</div>
			<div className='contentWrap'>
				<div className='content'>
					<div className='tables'>
						<div className='filters'>
							<Button
								variant='contained'
								onClick={() => {
									if (selectedUser && startDate && endDate) {
										if (
											DateFormats.areDatesEqual(
												DateFormats.setTime(startDate),
												DateFormats.setTime(endDate)
											) ||
											DateFormats.isDateBefore(startDate, endDate)
										) {
											loadOrders(selectedUser?.value, startDate, endDate)
										} else {
											// eslint-disable-next-line no-alert
											alert('Начальная дата не может быть больше конечной')
										}

										return
									}

									// eslint-disable-next-line no-alert
									alert('Сначала выберите пользователя и даты')
								}}
								disabled={isLoading}
							>
								Загрузить
							</Button>

							<DatePicker
								disabled={isLoading}
								value={startDate}
								onChange={date => setStartDate(date as Date)}
								label='Начало'
							/>

							<DatePicker
								disabled={isLoading}
								value={endDate}
								onChange={date => setEndDate(date as Date)}
								label='Конец'
							/>

							<GeneralAutocomplete
								label='Пользователи'
								value={selectedUser}
								disabled={isLoading}
								options={availableUsers.map(userParam => ({
									label: userParam.displayName,
									value: userParam.login,
								}))}
								onChange={setSelectedUser}
							/>

							<TextField
								label='Поиск'
								value={search}
								onChange={e => setSearch(e.target.value)}
								disabled={isLoading}
							/>
						</div>

						<div className='table'>
							<Typography className='title' variant='h6'>
								Заказы ({orders?.length})
							</Typography>
							<GeneralTable columns={columns} rows={filteredProductsStatistics} />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default OrdersPage
