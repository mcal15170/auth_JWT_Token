const mongoose = require('mongoose')
const dotenv = require('dotenv')
mongoose.Promise = global.Promise

dotenv.config()

mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('db connection done ')
  })
