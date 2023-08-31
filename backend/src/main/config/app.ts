import express from 'express'
import userRoute from '../routes/user.routes'
import { errorHandler, errorTreatment } from '../../presentation/middlewares/error-handler'
import cors from 'cors'

const app = express()
app.use(express.json())

app.use('/user', userRoute)
app.use(errorTreatment)
app.use(errorHandler)
app.use(cors())

export default app
