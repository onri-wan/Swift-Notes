const express = require('express')
const app = express()
const connectDB = require('./config/database.js')
const mainRoutes = require('./routes/main.js')
const todoRoutes = require('./routes/todos.js')
const passport = require('passport')
const logger = require('morgan')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const mongoose = require('mongoose')
const flash = require('express-flash')

// use environment variables
require('dotenv').config({path: './config/.env'})
// passport config
require('./config/passport')(passport)

// tell express we're using pug as template engine
app.set('view engine', 'pug')
// tell express to make 'public' folder accessible to the public by using built-in middleware
app.use(express.static('public'))
// get data from forms
app.use(express.urlencoded({ extended:true }))
// teach server to read JSON
app.use(express.json())
// tell to use morgan as logger
app.use(logger('dev'))

// sessions
app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({ mongooseConnection: mongoose.connection })
    })
)

// passport middleware
app.use(passport.initialize())
app.use(passport.session())

// help to show errors on page
app.use(flash())
  
app.use('/', mainRoutes)
app.use('/todos', todoRoutes)

// connect to MongoDB
connectDB()

// create server
app.listen(process.env.PORT, () => {
    console.log(`The server is running on port ${process.env.PORT}. You better go catch it!`)
})