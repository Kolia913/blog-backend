const Post = require('../model/Post')
const strToSlug = require('../slug')
const { postValidation } = require('../validation')

const getAll = async (req, res) => {
    const posts = await Post.find().exec()
    res.status(200).json(posts)
}

const findBySlug = async (req, res) => {
    const post = await Post.findOne({slug: req.params.slug}).exec()
    if(!post){
      return res.status(400).send(`Post ${req.params.slug} not found`)  
    }
    res.status(200).json(post )
}

/* const findByTitle = async (req, res) => {
    const post = await Post.findOne({title: req.params.title})
    if(!post){
      return res.status(400).send(`Post ${req.params.title} not found`)  
    }
    res.send(200).json(post)
}*/

const findByCategory = async (req, res) => {
    const posts = await Post.find({categoryId: req.params.categoryId})
    if(!posts){
        return res.status(400).send('No posts in this category')
    }
    res.status(200).json(posts)
}

const addPost = async (req, res) => {
    //Validation
    const {error} = postValidation(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }

    const slug = strToSlug(req.body.title)
    
    const postSlug = await Post.findOne({slug: slug})
    if(postSlug){
        return res.status(400).send(`Post already exists!`)
    }

    const post = new Post({
        title: req.body.title,
        slug: slug,
        description: req.body.description,
        content: req.body.content,
        authorId: req.body.authorId,
        categoryId: req.body.categoryId,
        imageUrl: req.body.imageUrl
    })
    try{
        const savedPost = await post.save()
        res.status(200).json(savedPost)
    }catch(err){
        res.status(400).send(err)
    }
}

const editPost = async (req, res) => {
    
    //Validation
    const {error} = postValidation(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }

    // Don't need to update slug

    /*const slug = strToSlug(req.body.title)
    
    const postSlug = await Post.findOne({slug: slug})
    if(postSlug){
        return res.status(400).send(`Post with that title(slug) already exists!`)
    }*/

    const post = {
        title: req.body.title,
        //slug: slug,
        description: req.body.description,
        content: req.body.content,
        authorId: req.body.authorId,
        categoryId: req.body.categoryId,
        imageUrl: req.body.imageUrl,
        updated_at: Date.now()
    }
    try{
       const updatedPost = await Post.findOneAndUpdate({slug: req.params.slug}, post, {new: true})
       if(!updatedPost){
           return res.status(400).send(`Post not found!`)
       }
       //console.log(updatedPost)
      res.status(200).json(updatedPost)
    }catch(err){
        res.status(400).send(err)
    }
}

const removePost = async (req, res) => {
     const removedPost = await Post.findOneAndRemove({slug: req.params.slug})
     if(!removedPost){
         return res.status(400).send(`Post not found!`)
     }
     res.status(200).json(removedPost)
}

module.exports = {
    getAll,
    findBySlug,
    findByCategory,
    addPost,
    editPost,
    removePost
}