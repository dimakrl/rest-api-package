/* eslint no-unused-vars: 0 */

// eslint-disable-next-line no-shadow
export enum HttpStatusCode {
	OK = 200,
	ACCEPTED = 202,
	UNAUTHORIZED = 401,
	FORBIDDEN = 403,
	NOT_FOUND = 404,
	TIMEOUT = 408,
	INTERNAL_SERVER_ERROR = 500,
}

// eslint-disable-next-line no-shadow
export enum HttpMethod {
	GET = 'GET',
	PUT = 'PUT',
	POST = 'POST',
	PATCH = 'PATCH',
	DELETE = 'DELETE',
}
