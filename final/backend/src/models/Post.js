import mongoose from 'mongoose'

const Schema = mongoose.Schema

const PostSchema = new Schema({
  //  id: { type: Number, required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    author: { type: String, required: true},
    score: { type: Number, required: true },
    img: { type: Object },
    comments: [{ type: mongoose.Types.ObjectId, ref: 'comment' }],
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

const PostModel = mongoose.model('Post', PostSchema)

export default PostModel
