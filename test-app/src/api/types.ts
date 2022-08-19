import { AxiosRequestConfig } from 'axios'

export type AxiosHandler<Param = unknown> = (
	param: Param
) => AxiosRequestConfig<any> | Promise<AxiosRequestConfig<any>>

export type Query = { [x: string]: { [x: string]: string } }
