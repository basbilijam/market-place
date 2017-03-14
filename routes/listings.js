
const express = require ('express'),
      router = express(),
      db = require(__dirname + '/modules/m-db');


// route to index page
router.get('/', (req, res) => {
  res.render('index', {
    db.User.
  })
})

modules.exports = router
