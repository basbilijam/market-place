const express = require ('express')
const router = express.Router()
const sequelize = require ('sequelize')
const bodyParser = require('body-parser')

// connecting to databse
const db = require('../modules/m-db')

// setting router sub app to use bodyparser
router.use(bodyParser.urlencoded({ extended: false }))

// setting up route ro register page
router.get('/register', (req, res) => {
  res.render('register')
})

router.get('/registercompany', (req, res) => {
  res.render('register-c')
})

// posting new user to database
router.post('/register', (req, res) => {
  const newUser = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    listing: req.body.listing,
    companyname: req.body.companyname,
    location: req.body.location,
    type: req.body.type
  }
  console.log(req.body)
  db.User.create(newUser).then()
  console.log(newUser)
  res.redirect('/')
})

module.exports = router
