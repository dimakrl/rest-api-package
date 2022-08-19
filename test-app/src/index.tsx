import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from '@mui/material/styles'
import App from './App'
import { themeOptions } from './material.theme'
import './index.css'

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={themeOptions}>
			<App />
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById('root')
)
