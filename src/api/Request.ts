import axios, {AxiosRequestConfig} from 'axios'
import {HttpMethod} from './constants'
import {AxiosHandler, BaseUrlConfig, RequestHandlers} from './types'

abstract class Request {
    protected apiResource: string
    protected abstract routes: { [x: string]: string }
    private readonly baseUrlConfig: BaseUrlConfig;
    private readonly requestHandlers?: RequestHandlers;
    private readonly fetch = axios

    private get protocol() {
        return this.baseUrlConfig.protocol
    }

    private get host() {
        return this.baseUrlConfig.host
    }

    private get port() {
        return this.baseUrlConfig.port
    }

    private get entryRoute() {
        return this.baseUrlConfig.entryRoute
    }

    protected get apiUrl() {
        return `${this.protocol}://${this.host}${
            this.port ? `:${this.port}` : ''
        }${this.entryRoute}`
    }

    protected get apiRoute() {
        return `${this.apiUrl}/${this.apiResource}`
    }

    private get requestInterceptor() {
        return this.fetch.interceptors.request
    }

    private get responseInterceptor() {
        return this.fetch.interceptors.response
    }

    constructor(baseUrlConfig: BaseUrlConfig, resourceName: string, requestHandlers?: RequestHandlers) {
        this.baseUrlConfig = baseUrlConfig;
        this.apiResource = resourceName;
        this.requestHandlers = requestHandlers;
    }

    async request<Body = unknown>(
        method: HttpMethod,
        url: string,
        body?: Body,
        extraConfig?: AxiosRequestConfig
    ) {
        this.addRequestHandlers();

        return this.fetch({
            data: body,
            method,
            url,
            ...extraConfig,
        } as AxiosRequestConfig)
    }

    private addRequestInterceptor(handler: AxiosHandler) {
        return this.requestInterceptor.use(handler)
    }

    private addResponseInterceptor(
        responseHandler: AxiosHandler,
        errorHandler: AxiosHandler
    ) {
        return this.responseInterceptor.use(responseHandler, errorHandler)
    }

    private addRequestHandlers() {
        if (this.requestHandlers?.requestHandler) {
            this.addRequestInterceptor(this.requestHandlers.requestHandler);
        }

        if (this.requestHandlers?.responseHandler || this.requestHandlers?.errorsHandler) {
            const defaultResponseHandler: AxiosHandler<any> = (res) => res;
            const defaultErrorHandler: AxiosHandler<any> = (err) => {
                console.error(err)

                return Promise.reject(err.message)
            }

            this.addResponseInterceptor(
                this.requestHandlers?.responseHandler || defaultResponseHandler,
                this.requestHandlers?.errorsHandler || defaultErrorHandler
            )
        }
    }
}

export default Request
