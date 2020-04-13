const router = require('express').Router()
const verify = require('../middleware/verifytoken')
const {getAll, findBySlug, findByCategory, findByAuthor, addPost, editPost, removePost} = require('../controller/post')
const upload = require('../controller/file-upload')

router.get('/', getAll)
router.get('/:slug', findBySlug)
router.get('/category/:categorySlug', findByCategory)
router.get('/author/:authorId', findByAuthor)
router.post('/add', verify, upload.single('image'), addPost)
router.put('/edit/:slug',verify, upload.single('image'), editPost)
router.delete('/delete/:slug', verify, removePost)

module.exports = router