const router = require('express').Router()
const {getAll, findBySlug, addCategory, editCategory, removeCategory} = require('../controller/category')
const verify = require('../middleware/verifytoken')
const isAdmin = require('../middleware/admin')
const upload = require('../controller/file-upload')

router.get('/', getAll)
router.get('/:slug', findBySlug)
router.post('/add', verify, isAdmin, upload.none(), addCategory)
router.put('/edit/:slug', verify, isAdmin, upload.none(), editCategory)
router.delete('/delete/:slug', verify, isAdmin, removeCategory)

module.exports = router