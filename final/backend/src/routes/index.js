import express from 'express'
import { registerUser, loginUser, getMe} from './user'
import { searchPost, createPost, showPost } from './post'
import protect from '../middleware/authMiddleware'

const router = express.Router()

router.post('/signup', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)

router.get('/search', searchPost)
router.post('/', createPost)
router.get('/',showPost)

export default router