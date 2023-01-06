import * as React from 'react'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Modal from '../components/postModal'
import ViewModal from '../components/viewModal'
import Rating from '../components/rating'
import { useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const instance = axios.create({
  baseURL: 'http://localhost:4000/api'
})


function Footer() {
  return (
    <Typography variant='body2' color='text.secondary' align='center'>
      {'Natinaol Taiwan University '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const theme = createTheme()

export default () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [posts, setPosts] = useState([])
  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false)
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [author, setAuthor] = useState("")
  const [score, setScore] = useState(0);


  const createPost = async (post) => {
    post.author = user.name
    const base64 = post.img.fileList[0].thumbUrl
    post.img = base64;
    await instance.post('/createPost', post)
  }

  const fetchPost = useCallback(async () => {
    const data = await instance.get('/show')
    setPosts(data.data.contents)
  }, [])


  useEffect(() => {
    setSuccess(false)
    fetchPost()
  }, [fetchPost, success])


  const navigateToLogn = () => {
    navigate('/login');
  };

  return (

    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Modal open={modalOpen} onCreate={(post) => {
          createPost(post)
          setModalOpen(false)
          setSuccess(true)
        }} onCancel={() => { setModalOpen(false) }}
        >
        </Modal>

        <ViewModal open={viewModalOpen} onClose={() => { setViewModalOpen(false) }}
          title={title} body={body} author={author} score={score} 
        >
        </ViewModal>

        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth='sm'>
            <Typography
              component='h1'
              variant='h2'
              align='center'
              color='text.primary'
              gutterBottom
            >
              Welcome
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction='row'
              spacing={2}
              justifyContent='center'
            >
              <Button onClick={() => {
                if (user)
                  setModalOpen(true)
                else
                  navigateToLogn()
              }} variant='contained'>Start reviewing </Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth='md'>
          {/* End hero unit */}
          <Grid container spacing={4}>
            {posts.map((post) => (
              <Grid item key={post._id} xs={12} sm={6} md={4} >
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <CardMedia
                    component='img'
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image={post.img}
                    alt='random'
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant='h5' component='h2'>
                      {post.title}
                    </Typography>
                    <Typography>
                      {`author: ${post.author}`}
                    </Typography>
                    <Rating value={post.score}></Rating>
                  </CardContent>

                  <CardActions>
                    <Button size='small' onClick={() => {
                      setViewModalOpen(true)
                      setTitle(post.title)
                      setBody(post.body)
                      setAuthor(post.author)
                      setScore(post.score)
                      console.log(post.createAt)
                    }}>View</Button>
                  </CardActions>

                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component='footer'>
        <Footer />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  )
}
