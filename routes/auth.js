const router = require('express').Router()
const {registerUser, loginUser, findUserById, editUser} = require('../controller/user')
const verify = require('../middleware/verifytoken')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/:id', findUserById)
router.put('/edit', verify, editUser)

module.exports = router