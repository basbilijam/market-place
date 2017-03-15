const express = require('express')
      sequelize = require ('sequelize')
      bodyParser = require ('body-parser')
      db = require (__dirname +'/m-db')
      router = express.Router()
      googleMapsClient = require('@google/maps').createClient({key: 'AIzaSyBqYbVHxiv8ebhz4tUZVH6Byj7s2A_4HqE'});

//search functionality on username
const search = router.post('/search', (req, res) => {
  console.log("req body is " +req.body.search)
  let searchQuery = req.body.search
  db.User.findAll( {
    where: {
      username: {
        $like: '%'+searchQuery+'%'
      }
    }
  }).then((result) => {
    console.log("Result is ", result)
    res.render('listings', {results: result})
  }).catch( err => {
    console.log(err);
  })
})

// search googlemaps api
// const search = router.post('/search', (req, res) => {
//   googleMapsClient.geocode({
//     console.log('req body is ', req.body.search)
//     location: req.body.search
//   }, function(err, response) {
//     if (!err) {
//       console.log('Googlemaps results are: ', response.json.results);
//     }
//   });
// })




module.exports = search
