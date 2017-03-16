const express = require ('express')
const router = express.Router()
const sequelize = require ('sequelize')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const GoogleMapsAPI = require('googlemaps')

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
// router.post('/register', (req, res) => {
//   bcrypt.hash(req.body.password, null, null, (err, hash) => {
//     const newUser = {
//       username: req.body.username,
//       email: req.body.email,
//       password: hash,
//       listing: req.body.listing,
//       companyname: req.body.companyname,
//       location: req.body.location,
//       style: req.body.type
//     }
//     console.log(req.body)
//     db.User.create(newUser).then()
//     console.log(newUser)
//     res.redirect('/')
//   })
//
//
// })

var publicConfig = {
  key: 'AIzaSyBy1LYoxta3n2-pwyI5ipEr8vZzcB1Z_Yw',
  stagger_time:       1000, // for elevationPath
  encode_polylines:   false,
  secure:             true // use https
  //proxy:              'http://127.0.0.1:9999' // optional, set a proxy for HTTP requests
};

// posting new user to database with google maps directly
router.post('/register', (req, res) => {
  console.log(req.body)
  const params = {
    center: req.body.location,
    zoom: 15,
    size: '500x400',
    maptype: 'roadmap',
    markers: [
      {
        location: req.body.location,
        label   : 'A',
        color   : 'green',
        shadow  : true
      }
    ]
  }
  const gmAPI = new GoogleMapsAPI(publicConfig);
  const newUser = {
    username: req.body.username,
    email: req.body.email,
    // password: hash,
    company: req.body.company,
    location: req.body.location,
    postalcode: req.body.postalcode,
    locationurl: gmAPI.staticMap(params),
    style: req.body.type
  }
  bcrypt.hash(req.body.password, null, null, (err, hash) => {
    newUser.password = hash
    db.User.create(newUser).then( () => {
      console.log(newUser)
      console.log("Locationurl is: ", gmAPI.staticMap(params));
    })
  })
  res.redirect('/')

})

module.exports = router
