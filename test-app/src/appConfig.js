const appConfig = {
	API_PROTOCOL: process.env.REACT_APP_API_PROTOCOL || 'http',
	API_HOST: process.env.REACT_APP_API_HOST,
	API_PORT: process.env.REACT_APP_API_PORT || '',
	API_ENTRY_ROUTE: process.env.REACT_APP_API_ENTRY_ROUTE || '/api',
}

export default appConfig
