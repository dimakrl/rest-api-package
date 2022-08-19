import { Product } from '../product/ProductModel'

// eslint-disable-next-line no-shadow
export enum OrderStatus {
	PROCESSING = 'processing',
	ACCEPTED = 'accepted',
	REJECTED = 'rejected',
	INVALID = 'invalid',
	UNKNOWN = 'unknown',
	NO_STATUS = 'noStatus',
}

export interface StatusFullInfo {
	orderStatus: OrderStatus
	description: string
}

export interface OrderModel {
	id: string
	orderId: string
	site: string
	localization: string
	bayerName: string
	phone: string
	email: string
	total: string
	datetime: string
	dateUpdate: string
	status: string
	cancelDescription: string
	ip: string
	delivery: string
	deliveryDate: string
	deliveryAdress: string
	ttn: string
	ttnStatus: string
	ttnCreate: string
	user: string
	dateSaveUser: string
	office: string
	payment: string
	new: string
	dateComplete: string
	cart: string
	comment: string
	utmSource: string
	utmMedium: string
	utmTerm: string
	utmContent: string
	utmCampaign: string
	additional1: string
	additional2: string
	additional3: string
	additional4: string
	products: Product[]
	statusFullInfo: StatusFullInfo
}
