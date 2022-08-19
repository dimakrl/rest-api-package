import ApiResourceRequest from '../ApiResourceRequest'
import { Query } from '../types'
import { HttpMethod } from '../constants'

class OrderRequest extends ApiResourceRequest {
	apiResource = 'orders'

	protected customRoutes = {
		GET_ORDERS_BY_USER: `${this.apiRoute}/by-user-name/{userLogin}`,
	}

	public async getByUser(userLogin: string, query: Query = {}) {
		const queryString = this.buildQueryString(
			this.getExtraQueryParams(query.extra)
		)

		const response = await this.request(
			HttpMethod.GET,
			this.customRoutes.GET_ORDERS_BY_USER.replace('{userLogin}', userLogin) +
				queryString
		)

		return {
			resources: response?.data?.resources,
			total: response?.data?.total,
			meta: response?.data,
		}
	}
}

const orderRequest = new OrderRequest()

export default orderRequest
