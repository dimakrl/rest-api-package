import ApiResourceRequest from '../ApiResourceRequest'
import { HttpMethod } from '../constants'

class UserRequest extends ApiResourceRequest {
	apiResource = 'users'

	protected customRoutes = {
		GET: `${this.apiRoute}`,
	}

	async get() {
		const response = await this.request(HttpMethod.GET, this.customRoutes.GET)

		return {
			resources: response?.data?.resources,
			total: response?.data?.total,
			meta: response?.data,
		}
	}
}

const userRequest = new UserRequest()

export default userRequest
