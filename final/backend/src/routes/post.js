import PostModel from "../models/Post";

const searchPost = async (req, res) => {
    const queryString = req.query.queryString;
    const post = await PostModel.find({ title: queryString });
    if (post.length)
        res.status(200).send({ message: 'success', contents: post })
    else
        res.status(403).send({ message: 'error', contents: [] })
}

const createPost = async (req, res) => {
    const { title, body, author, score, img } = req.body;
    const origin = await PostModel.findOne({ title: title, author: author });
    let post;
    if (origin) {
        origin.body = body;
        await origin.save();
        try {
            post = await PostModel.find({ title: title });
            console.log("Updating:", origin);
            res.send({ message: `Updating (${title}, ${body}, ${author})`, post: origin });
        }
        catch (err) {
            throw new Error(err)
        }
    }
    else {
        const newPost = new PostModel({ title: title, body: body, author: author, score: parseInt(score), img: img });
        await newPost.save();
        try {
            console.log("Adding:", newPost);
            res.send({ message: `Adding ()`, post: newPost });
        }
        catch (err) {
            throw new Error(err)
        }
    }
}

const showPost = async (req, res) => {
    const queryString = req.query.title;
    let posts
    if(queryString){
        posts = await PostModel.find({ title: queryString });
    }
    else{
        posts = await PostModel.find().sort({ updated_at: -1 });
    }

    if (posts.length)
        res.status(200).send({ message: 'success', contents: posts })
    else
        res.status(200).send({ message: 'error', contents: [] })
}


export { searchPost, createPost, showPost }

