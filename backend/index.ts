import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import { PORT } from './constants'
import router from './routes' 
import { UriStore, UriData } from './store/UriStore'
import { getKey, updateKey } from './store/State'


import GenerateAdmin from './generators/admin'
GenerateAdmin()


const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/', express.static(__dirname + '/public'))

app.use('/', router)

app.listen(PORT, () => {
  console.log(`Serving on Port : ${PORT}`)
})
