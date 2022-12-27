const express = require('express')
const app = express()
const connectDB = require('./config/database.js')
const homeRoutes = require('./routes/home.js')
const todoRoutes = require('./routes/todos.js')
require('dotenv').config({path: './config/.env'})

// tell express we're using pug as template engine
app.set('view engine', 'pug')
// tell express to make 'public' folder accessible to the public by using built-in middleware
app.use(express.static('public'))
// get data from forms
app.use(express.urlencoded({ extended:true }))
// teach server to read JSON
app.use(express.json())

// connect to MongoDB
connectDB()
  
app.use('/', homeRoutes)
app.use('/todos', todoRoutes)

// create server
app.listen(process.env.PORT, () => {
    console.log(`The server is running on port ${process.env.PORT}. You better go catch it!`)
})