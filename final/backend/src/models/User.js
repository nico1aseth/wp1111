import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    posts: [{ type: mongoose.Types.ObjectId, ref: 'post' }],
  },
  {
    timestamps: true,
  }
)

const UserModel = mongoose.model('User', userSchema)

export default UserModel
