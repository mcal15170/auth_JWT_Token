const router = require('express').Router()
const User = require('../model/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//import validation for user
const { userValidation, loginValidation } = require('../validation')

router.post('/register', async (req, res) => {
  //   check validation
  const { error } = userValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  // check email is exist or not
  const emailExist = await User.findOne({ email: req.body.email })
  if (emailExist) return res.status(400).send('Email is Exist')

  //Hash the Password
  const salt = await bcrypt.genSalt(1)
  const hashedPassword = await bcrypt.hash(req.body.password, salt)

  //   create new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  })
  try {
    const newUser = await user.save()
    res.send(newUser)
  } catch (error) {
    res.status(301).send(error)
  }
})

router.post('/login', async (req, res) => {
  //   check validation
  const { error } = loginValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  //   checking if email is exists
  const user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(400).send('Email is Not Found')

  //Password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password)
  if (!validPass) return res.status(400).send('Invalid Password')

  //   Create and Assign Token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
  res.header('auth-token', token).send(token)

  res.send('login')
})

module.exports = router
