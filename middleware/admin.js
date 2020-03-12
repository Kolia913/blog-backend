const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const token = req.header('auth-token')
    const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        if(verified.admin){
            next()
        }else{
           return res.status(401).send('Access Denied!')
        }
}
