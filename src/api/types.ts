import {AxiosRequestConfig} from 'axios'

export type AxiosHandler<Param = unknown> = (
    param: Param
) => AxiosRequestConfig<any> | Promise<AxiosRequestConfig<any>>

export type Query = { [x: string]: { [x: string]: string } }

export interface AssociativeArray<Value = unknown> {
    [key: string]: Value
}

export interface BaseUrlConfig {
    protocol: 'http' | 'https',
    host: string,
    port?: number,
    entryRoute: string,
}

export type RequestHandlers = Partial<{
    requestHandler: AxiosHandler,
    responseHandler: AxiosHandler,
    errorsHandler: AxiosHandler
}>

export interface Pager {
    pageNumber: number,
    pageSize: number
}