const express = require('express')
      sequelize = require ('sequelize')
      bodyParser = require ('body-parser')
      db = require (__dirname +'/m-db')
      router = express.Router()

// search functionality on username
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

module.exports = search
