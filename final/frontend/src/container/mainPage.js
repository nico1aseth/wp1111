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
import Link from '@mui/material/Link'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Modal from '../components/postModal'
import { useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { render } from 'react-dom'

const instance = axios.create({
  baseURL: 'http://localhost:5000/api',
})

function Copyright() {
  return (
    <Typography variant='body2' color='text.secondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://mui.com/'>
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const cards = [1, 2, 3, 4, 5, 6]

const renderImg = (file) => {
  const reader = new FileReader()
  console.log(file)
  reader.onload = (e) => {
    URL = console.log(e.target.result)
  }
  reader.readAsDataURL(file)
}

//posts ? renderImg(posts[0]['img']) : null

const theme = createTheme()

export default () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [posts, setPosts] = useState([])
  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  let newPostCount = 0
  const createPost = async (post) => {
    post.author = user.name
    console.log(post)
    await instance.post('/createPost', post)
    await newPostCount++
  }

  const fetchPost = useCallback(async () => {
    const data = await instance.get('/show')
    console.log(data.data.contents)
    setPosts(data.data.contents)
  }, [])

  useEffect(() => {
    //console.log(user)
    // console.log(posts)
    fetchPost()
  }, [fetchPost, newPostCount])

  const navigateToLogn = () => {
    navigate('/login')
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Modal
          open={modalOpen}
          onCreate={(post) => {
            createPost(post)
            setModalOpen(false)
          }}
          onCancel={() => {
            setModalOpen(false)
          }}
        ></Modal>

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
            <Typography
              variant='h5'
              align='center'
              color='text.secondary'
              paragraph
            >
              Something short and leading about the collection below—its
              contents, the creator, etc. Make it short and sweet, but not too
              short so folks don&apos;t simply skip over it entirely.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction='row'
              spacing={2}
              justifyContent='center'
            >
              <Button
                onClick={() => {
                  if (user) setModalOpen(true)
                  else navigateToLogn()
                }}
                variant='contained'
              >
                Start reviewing{' '}
              </Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth='md'>
          {/* End hero unit */}
          <Grid container spacing={4}>
            {posts.map((post) => (
              <Grid item key={post._id} xs={12} sm={6} md={4}>
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
                    image='https://source.unsplash.com/random'
                    alt='random'
                  />

                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant='h5' component='h2'>
                      Heading//
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe
                      the content.//
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size='small'>View</Button>
                    <Button size='small'>Comment</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component='footer'>
        <Typography variant='h6' align='center' gutterBottom>
          Footer
        </Typography>
        <Typography
          variant='subtitle1'
          align='center'
          color='text.secondary'
          component='p'
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  )
}
