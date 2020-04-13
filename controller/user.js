const bcrypt = require('bcryptjs')
const User = require('../model/User')
const { registerValidation, loginValidation } = require('../validation')
const jwt = require('jsonwebtoken')
const jwtDecode = require('jwt-decode')

const registerUser = async (req, res) => {
    //VALIDATION
    const {error} = registerValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    //Checking if the user is already in the database
    const emailExist = await User.findOne({email: req.body.email})
    if(emailExist){
        return res.status(400).send(`Email already exists`)
    }
     //Checking if the user is already in the database
    const nameExist = await User.findOne({name: req.body.name})
    if(nameExist){
        return res.status(400).send(`Name already exists`)
    }

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    //Creating a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
    try{
       const savedUser = await user.save()
       res.status(200).json(savedUser)
    }catch(err){
        res.status(400).send(err)
    }
}

const loginUser =  async (req, res) => {

    const {error} = loginValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const user = await User.findOne({email: req.body.email})
    if(!user){
        return res.status(400).send(`Email is not found`)
    }

    const validPass = await bcrypt.compare(req.body.password, user.password)
    if(!validPass){
        return res.status(400).send(`Invalid password`)
    }
   //Create and assign a token
   const token = jwt.sign({_id: user._id, admin: user.admin}, process.env.TOKEN_SECRET, {expiresIn: '3h'})
   res.status(200).json(token)
}

const findUserById = async (req, res) => {
    const user = await User.findById(req.params.id).exec()
    if(!user){
        return res.status(400).send(`User not found`)
    }
    res.status(200).json(user)
}

const editUser = async (req, res) => {
 
    const decodedToken = jwtDecode(req.header('auth-token'))
    const userId = decodedToken._id

   const user = await User.findById(userId)

   if(!user){
       return res.status(400).send(`User is not found`)
   }
   const validPass = await bcrypt.compare(req.body.oldPassword, user.password)
   if(!validPass){
       return res.status(400).send(`Invalid password`)
   }
   const emailExist = await User.findOne({email: user.email})
    if(emailExist.email && emailExist.email != req.body.email){
        return res.status(400).send(`Email already exists`)
    }

    if(req.body.password) {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

     updateUser = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    }
    const updateduser = await User.findByIdAndUpdate(userId, updateUser, {new: true})
    return  res.status(200).json(updateduser)
  }
    updateUser = {
        name: req.body.name,
        email: req.body.email
    }
    const updateduser = await User.findByIdAndUpdate(userId, updateUser, {new: true})
    res.status(200).json(updateduser)
}

module.exports = {
    registerUser,
    loginUser,
    findUserById,
    editUser
}