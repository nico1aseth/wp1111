import mongoose from 'mongoose'

const Schema = mongoose.Schema

const commentSchema = new Schema({
    text: { type: String, required: true },
    sender: { type: String, required: true },
    post: { type: mongoose.Types.ObjectId, ref: 'Post' },
    img: { type: String, required: false }
});

const CommentModel = mongoose.model('Comment', commentSchema);

export default CommentModel
