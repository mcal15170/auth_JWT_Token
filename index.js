const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
require('express-async-errors')

const app = express()

//  Import Routes
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')

// Database Connection
require('./mongo')

// Start Middleware

// body Parser
app.use(bodyParser.json()).use(morgan())

// Route Middleware
app.use('/api/user', authRoute)
app.use('/api/posts', postRoute)

// End Middleware

app.listen(3000, () => {
  console.log('Server Up and Running on Port 3000')
})
