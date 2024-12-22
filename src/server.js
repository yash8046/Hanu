const express = require('express')
const axios = require('axios')

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
	res.send('Working')
})


app.listen(3000, () => {
	console.log('Example app listening on port 3000!')
})