
const express = require ('express'),
      app = express();


// route to index page
router.get('/', (req, res) => {
  res.render('index')
})

modules.exports = router
