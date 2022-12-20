import mongoose from 'mongoose'
import { dataInit } from './upload.js'

import 'dotenv-defaults/config.js'

mongoose.set('strictQuery', true)

async function connect() {
  // TODO 1 Connect to your MongoDB and call dataInit()
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    dataInit()

    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (err) {
    console.error(`Error: ${err.message}`)
    process.exit(1)
  }

  // TODO 1 End
}

export default { connect }
