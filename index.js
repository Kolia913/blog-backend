const express = require('express')
const cors = require('cors')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')

//Import routes
const authRoute = require('./routes/auth')
const postsRoute = require('./routes/posts')
const categoriesRoute = require('./routes/ctegories')
const commentsRoute = require('./routes/comments')

// Uploads folder
app.use('/uploads', express.static('uploads'))
dotenv.config()

//Connect to DB
mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true},
 () => console.log(`Connected to DB`))

 //Middleware
 app.use(express.json())

//Route Middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, auth-token");
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
  next();
});

app.use('/api/user', authRoute)
app.use('/api/posts', postsRoute)
app.use('/api/categories', categoriesRoute)
app.use('/api/comments', commentsRoute)

//CORS

app.use(cors())

app.listen(3000, () => console.log(`Server is running`))
