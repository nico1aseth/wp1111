import * as React from 'react'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Rating from '../components/rating'
import { useState, useEffect, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import ViewModal from '../components/viewModal'
import Spinner from '../components/Spinner'
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
    const [posts, setPosts] = useState([])
    const { state } = useLocation();
    const [viewModalOpen, setViewModalOpen] = useState(false)
    const [load, setLoad] = useState(true)
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [author, setAuthor] = useState("")
    const [score, setScore] = useState(0);

    const searchPost = useCallback(async () => {
        const data = await instance.get('/search', { params: { title: state.query } })
        setPosts(data.data.contents)
        setLoad(false)
    }, [])


    useEffect(() => {
        searchPost()
    }, [state])



    return (

        <ThemeProvider theme={theme}>
            <CssBaseline />
            <main>
                <ViewModal open={viewModalOpen} onClose={() => { setViewModalOpen(false) }}
                    title={title} body={body} author={author} score={score}
                >
                </ViewModal>
                <Container sx={{ py: 8 }} maxWidth='md'>
                    {load? <Spinner></Spinner>:null}
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
                                        }}>View</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    {posts.length === 0 && !load ? <Typography
                        component='h1'
                        variant='h2'
                        align='center'
                        color='text.primary'
                        gutterBottom
                    >
                        No results matching
                    </Typography> : null}
                </Container>
            </main>
            {/* Footer */}

            <Box sx={{ bgcolor: 'background.paper', p: 6 }} component='footer'>
                <Footer />
            </Box>
        </ThemeProvider>
    )
}
