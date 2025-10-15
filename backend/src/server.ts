import express from 'express'
import cors from 'cors'
import appointmentsRouter from './routes/appointments'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/appointments', appointmentsRouter)

const PORT = process.env.PORT || 4000
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`🚀 API running on port ${PORT}`))
}

export default app
