const router = require('express').Router()
const verify = require('../middleware/verifytoken')
const {getAll, findBySlug, findByCategory, findByAuthor, addPost, editPost, removePost} = require('../controller/post')

router.get('/', getAll)
router.get('/:slug', findBySlug)
router.get('/category/:categorySlug', findByCategory)
router.get('/author/:authorId', findByAuthor)
router.post('/add', verify, addPost)
router.put('/edit/:slug', verify, editPost)
router.delete('/delete/:slug', verify, removePost)

module.exports = router