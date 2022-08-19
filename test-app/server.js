// eslint-disable-next-line @typescript-eslint/no-var-requires,import/no-extraneous-dependencies
const express = require('express')

const app = express()
const port = process.env.PORT || 3000
// eslint-disable-next-line @typescript-eslint/no-var-requires,import/no-extraneous-dependencies
const path = require('path')

const publicPath = path.join(__dirname, 'build')
app.use(express.static(publicPath))
app.use(express.static(publicPath))

app.get('*', (req, res) => {
	res.sendFile(path.join(publicPath, 'index.html'))
})

app.listen(port, () => {
	console.log(`Server is up on port ${port}!`)
})
