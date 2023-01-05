import users from './data/users';
import User from './models/User'
import db from './config/db.js'

db.connect();

const importData = async () => {
  try {
    await User.deleteMany()
    await User.insertMany(users)

    console.log('Data Imported')
    process.exit()
  } catch (err) {
    console.error(`${err}`)
    process.exit(1)
  }
}

const deleteData = async () => {
  try {
    await User.deleteMany()

    console.log('Data Deleted')
    process.exit()
  } catch (err) {
    console.error(`${err}`)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  deleteData()
} else importData()
