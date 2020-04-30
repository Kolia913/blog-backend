const Comment = require('../model/Comment')
const Post = require('../model/Post')
const {commentValidation} = require('../validation')
const jwtDecode = require('jwt-decode') 

const addComment = async(req, res) => {
  const {error} = commentValidation(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const comment = new Comment({
      postSlug: req.body.postSlug,
      authorId: req.body.authorId,
      content: req.body.content,
      created_at: Date.now()
  })
  try{
    const savedComment = await comment.save()
    res.status(200).json(savedComment)
  }catch(err){
    res.status(400).send(err)
  }
}

const getPostComments = async (req, res) => {
    const comments = await Comment.find({postSlug: req.params.slug}).exec()
    res.status(200).json(comments)
} 

const deleteComment = async (req, res) => {
   
   const decodedToken = jwtDecode(req.header('auth-token'))
   const userId = decodedToken._id

   const comment = await Comment.findById(req.params.id)
   const post = await Post.findOne({slug: comment.postSlug})

   if(comment.authorId === userId || post.authorId !== comment.authorId){
    const removedComment = await comment.remove()
    res.status(200).json(removedComment)
   } else {
      return res.status(401).send('Access denied!')
   }
   
   }

module.exports = {
  addComment,
  getPostComments,
  deleteComment  
}