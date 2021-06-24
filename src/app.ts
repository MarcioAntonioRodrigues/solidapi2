import express from 'express'
import { router } from './routes'
import swaggerUi from 'swagger-ui-express'

const swaggerFile = require('../swagger_output.json')
const app = express()

app.use(express.json())
app.use(router)
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

export { app }