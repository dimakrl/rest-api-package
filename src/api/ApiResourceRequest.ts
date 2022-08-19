import {HttpMethod} from './constants'
import Request from './Request'
import {Query, AssociativeArray, Pager} from './types'

class ResourceRequest extends Request {
    protected routes: AssociativeArray<string> = {
        GET: `${this.apiRoute}`,
        FIND: `${this.apiRoute}/`,
        CREATE: `${this.apiRoute}`,
        UPDATE: `${this.apiRoute}/`,
        DELETE: `${this.apiRoute}/`,
    }

    async makeRequest<Body = unknown>(method: HttpMethod, url: string, body?: Body) {
        let result
        try {
            result = await this.request(method, url, body)
        } catch (error: any) {
            throw error
        }

        return result
    }

    async get(pager: Pager, query: Query = {}) {
        const queryString = this.buildQueryString(
            this.getPaginationParams(pager),
            this.getExtraQueryParams(query.extra)
        )

        const response = await this.makeRequest(
            HttpMethod.GET,
            this.routes.GET + queryString
        )

        return {
            resources: response?.data?.resources,
            total: response?.data?.total,
            meta: response?.data,
        }
    }

    async find(id: number | string, query: Query = {}) {
        if (!id) {
            throw new Error('Id is required to find a resource!')
        }

        const queryString = this.buildQueryString(
            this.getExtraQueryParams(query.extra)
        )
        const response = await this.makeRequest(
            HttpMethod.GET,
            this.routes.FIND + id + queryString
        )

        return response?.data
    }

    async create<Body = unknown>(body: Body) {
        const response = await this.makeRequest<Body>(
            HttpMethod.POST,
            this.routes.CREATE,
            body
        )

        return response.data
    }

    async update<Body = unknown>(
        id: number,
        body: Body,
        method = HttpMethod.PUT
    ): Promise<any> {
        const response = await this.makeRequest<Body>(
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
        const response = await this.makeRequest(
            HttpMethod.DELETE,
            this.routes.DELETE + id
        )

        return response?.data
    }

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

    getPaginationParams(pager: Pager) {
        if (pager.pageSize < 0) {
            return ''
        }
        return `&page=${pager.pageNumber}&limit=${pager.pageSize}`
    }

    getExtraQueryParams(params: { [x: string]: string } = {}) {
        if (!params) {
            return ''
        }
        let extraParams = ''

        for (const [param, value] of Object.entries(params)) {
            extraParams += `&${param}=${value}`
        }

        return extraParams
    }
}

export default ResourceRequest
