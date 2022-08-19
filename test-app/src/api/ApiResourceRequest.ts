import { HttpMethod, HttpStatusCode } from './constants'
import Request from './Request'
import { Query } from './types'
import { AssociativeArray } from '../types'

abstract class ResourceRequest extends Request {
	protected routes: AssociativeArray<string> = {
		GET: `${this.apiRoute}`,
		FIND: `${this.apiRoute}/`,
		CREATE: `${this.apiRoute}`,
		UPDATE: `${this.apiRoute}/`,
		DELETE: `${this.apiRoute}/`,
	}

	async request<Body = unknown>(method: HttpMethod, url: string, body?: Body) {
		let result
		try {
			result = await super.request(method, url, body)
		} catch (error: any) {
			if (error?.response?.status === HttpStatusCode.UNAUTHORIZED) {
				// eslint-disable-next-line no-console
				console.error('UNAUTHORIZED')
				// window.location.href = window.location.origin + PATH.AUTH.LOGIN
			}
			throw error
		}

		return result
	}

	// todo refactor by using Pager class
	async get(pageNumber = 1, pageSize = 10, query: Query = {}) {
		const queryString = this.buildQueryString(
			this.getPaginationParams(pageNumber, pageSize),
			this.getExtraQueryParams(query.extra)
		)

		const response = await this.request(
			HttpMethod.GET,
			this.routes.GET + queryString
		)

		return {
			resources: response?.data?.resources,
			total: response?.data?.total,
			meta: response?.data,
		}
	}

	async lookupGet(pageNumber = 1, pageSize = 10, query = {}) {
		return this.get(pageNumber, pageSize, query)
	}

	async find(id: number | string, query: Query = {}) {
		if (!id) {
			throw new Error('Id is required to find a resource!')
		}

		const queryString = this.buildQueryString(
			this.getExtraQueryParams(query.extra)
		)
		const response = await this.request(
			HttpMethod.GET,
			this.routes.FIND + id + queryString
		)

		return response?.data
	}

	async create<Body = unknown>(body: Body) {
		const response = await this.request<Body>(
			HttpMethod.POST,
			this.routes.CREATE,
			body
		)

		return response.data
	}

	async update<Body = unknown>(
		id: number,
		body: Body,
		method = HttpMethod.PATCH
	) {
		const response = await this.request<Body>(
			method,
			this.routes.UPDATE + id,
			body
		)

		return response?.data
	}

	async partialUpdate<Body = unknown>(id: number, body: Body) {
		return this.update<Body>(id, body, HttpMethod.PATCH)
	}

	async delete(id: number) {
		const response = await this.request(
			HttpMethod.DELETE,
			this.routes.DELETE + id
		)

		return response?.data
	}

	// eslint-disable-next-line class-methods-use-this
	buildQueryString(...queryParams: string[]) {
		let queryString = ''
		let firstQueryParamSet = false
		queryParams
			.filter(queryParam => queryParam)
			.forEach(queryParam => {
				if (firstQueryParamSet) {
					queryString += queryParam
				} else {
					queryString += `?${queryParam.slice(1)}`
					firstQueryParamSet = true
				}
			})

		return queryString
	}

	// eslint-disable-next-line class-methods-use-this
	getPaginationParams(pageNumber: number, pageSize: number) {
		if (pageSize < 0) {
			return ''
		}
		return `&page=${pageNumber}&limit=${pageSize}`
	}

	// eslint-disable-next-line class-methods-use-this
	getExtraQueryParams(params: { [x: string]: string } = {}) {
		if (!params) {
			return ''
		}
		let extraParams = ''
		// eslint-disable-next-line no-restricted-syntax
		for (const [param, value] of Object.entries(params)) {
			extraParams += `&${param}=${value}`
		}

		return extraParams
	}
}

export default ResourceRequest
