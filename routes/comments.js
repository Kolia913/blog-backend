const router = require('express').Router()
const verify = require('../middleware/verifytoken')
const {getPostComments, addComment, deleteComment} = require('../controller/comment')
const upload = require('../controller/file-upload')

router.get('/:slug', getPostComments)
router.post('/add', verify, upload.none(), addComment)
router.delete('/remove/:id', verify, deleteComment)

module.exports = router