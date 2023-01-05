import express from 'express'
import cors from 'cors'
import mongo from './mongo.js'
import mongoose from 'mongoose'
import userRoutes from './routes'
import cloudinary from 'cloudinary'

cloudinary.config({
  cloud_name: 'dhayyhrtl',
  api_key: '921198211742996',
  api_secret: 'bsx9Lh-jSzp7ssZEHZTlJRChhcc',
})

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/users', userRoutes)
app.use('/api/createPost', userRoutes)
app.use('/api/show', userRoutes)

mongo.connect()
const db = mongoose.connection

db.once('open', () => {
  console.log('MongoDB connected!')
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
