import { StatusFullInfo } from '../order/OrderModel'

export interface Product {
	type: string
	productId: string
	name: string
	productName: string
	subId: string
	subName: string
	price: string
	quantity: string
	statusFullInfo?: StatusFullInfo
}

export interface Statistic {
	count: number
	percent: number
}

export interface ProductStatistics {
	id: string
	name: string
	processingStatistic: Statistic
	acceptedStatistic: Statistic
	rejectedStatistic: Statistic
	invalidStatistic: Statistic
	unknownStatistic?: Statistic
}
