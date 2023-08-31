import express from 'express'
import userRoute from '../routes/user.routes'
import { errorHandler, errorTreatment } from '../../presentation/middlewares/error-handler'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/user', userRoute)
app.use(errorTreatment)
app.use(errorHandler)

export default app
