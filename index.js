const express = require('express')
const cors = require('cors')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')

//Import routes
const authRoute = require('./routes/auth')
const postsRoute = require('./routes/posts')
const categoriesRoute = require('./routes/ctegories')

// Uploads folder
app.use('/uploads', express.static('uploads'))
dotenv.config()

//Connect to DB
mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true},
 () => console.log(`Connected to DB`))

 //Middleware
 app.use(express.json())

//Route Middleware
app.use('/api/user', authRoute)
app.use('/api/posts', postsRoute)
app.use('/api/categories', categoriesRoute)

//CORS
var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 
  }
app.use(cors(corsOptions))

app.listen(3000, () => console.log(`Server is running`))
