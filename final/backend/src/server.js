import express from 'express'
import cors from 'cors';
import mongo from './mongo.js'
import mongoose from 'mongoose'
import userRoutes from './routes'

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/users', userRoutes)
app.use('/api/createPost', userRoutes)
app.use('/api/updateUserPost', userRoutes)
app.use('/api/show', userRoutes)
app.use('/api/search', userRoutes)

mongo.connect()
const db = mongoose.connection

db.once('open', () => {
  console.log('MongoDB connected!')
})

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
