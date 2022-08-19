import axios, { AxiosRequestConfig } from 'axios'
import { toast } from 'react-toastify'
import appConfig from '../appConfig'
import { HttpMethod, HttpStatusCode } from './constants'
import { AxiosHandler } from './types'

abstract class Request {
	protected abstract apiResource: string /** @dima todo: fix it */

	protected abstract routes: { [x: string]: string }

	protected get apiUrl() {
		return `${this.apiProtocol}://${this.apiHost}${
			this.apiPort ? `:${this.apiPort}` : ''
		}${this.apiEntryRoute}`
	}

	protected get apiRoute() {
		return `${this.apiUrl}/${this.apiResource}`
	}

	private readonly config = appConfig

	private readonly fetch = axios

	private get apiProtocol() {
		return this.config.API_PROTOCOL
	}

	private get apiHost() {
		return this.config.API_HOST
	}

	private get apiPort() {
		return this.config.API_PORT
	}

	private get apiEntryRoute() {
		return this.config.API_ENTRY_ROUTE
	}

	async request<Body = unknown>(
		method: HttpMethod,
		url: string,
		body?: Body,
		extraConfig?: AxiosRequestConfig
	) {
		this.addGlobalErrorHandlingInterceptor()

		return this.fetch({
			data: body,
			method,
			url,
			...extraConfig,
		} as AxiosRequestConfig)
	}

	getRequestInterceptors() {
		return this.fetch.interceptors.request
	}

	addRequestInterceptor(handler: AxiosHandler) {
		return this.fetch.interceptors.request.use(handler)
	}

	addResponseInterceptor(
		responseHandler: AxiosHandler,
		errorHandler: AxiosHandler
	) {
		return this.fetch.interceptors.response.use(responseHandler, errorHandler)
	}

	removeRequestInterceptor(id: number) {
		this.fetch.interceptors.request.eject(id)
	}

	/** todo refactor any */
	addGlobalErrorHandlingInterceptor() {
		this.addResponseInterceptor(
			(response => response) as AxiosHandler,
			((error: any) => {
				if (error?.response?.status !== HttpStatusCode.UNAUTHORIZED) {
					// eslint-disable-next-line no-console
					console.error('error', error)

					toast.error('Что-то пошло не так. Перезагрузите приложение.', {
						position: 'top-right',
						autoClose: 3000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					})
				}

				return error
			}) as AxiosHandler
		)
	}
}

export default Request
