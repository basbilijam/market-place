const express = require ('express')
const router = express.Router()
const sequelize = require ('sequelize')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const GoogleMapsAPI = require('googlemaps')
const multer  = require('multer')
const upload = multer({ dest: __dirname + '/../uploads/' })

// connecting to databse
const db = require('../modules/m-db')

// setting router sub app to use bodyparser
router.use(bodyParser.urlencoded({ extended: false }))

// setting up route ro register page
router.get('/register', (req, res) => {
  res.render('register')
})

// setting up route to register page for a company
router.get('/registercompany', (req, res) => {
  res.render('register-c')
})

var publicConfig = {
  key: 'AIzaSyBy1LYoxta3n2-pwyI5ipEr8vZzcB1Z_Yw',
  stagger_time:       1000, // for elevationPath
  encode_polylines:   false,
  secure:             true // use https
  //proxy:              'http://127.0.0.1:9999' // optional, set a proxy for HTTP requests
};

// posting new user to database with google maps directly, adding the option to upload a picture.
router.post('/register', upload.single('profile'), (req, res) => {
  console.log('Req.body is', req.body)
  //setting the parameters for the map that is associated to the user
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
  // setting new map through googlemaps API
  const gmAPI = new GoogleMapsAPI(publicConfig);
  const newUser = {
    username: req.body.username,
    email: req.body.email,
    // password: hash,
    company: req.body.company,
    location: req.body.location,
    postalcode: req.body.postalcode,
    locationurl: gmAPI.staticMap(params),
    style: req.body.type,
    picture: req.file
  }
  console.log('req.file is: ', req.file);
  // hashing the password with bcrypt module
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
