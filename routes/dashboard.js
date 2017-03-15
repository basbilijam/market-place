const express = require ('express'),
      session = require ('express-session'),
      router = express.Router(),
      db = require(__dirname +'/../modules/m-db');


router.use(session({
    secret: 'secure',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

// going back to your dashboard (profile) when logged in already
router.get('/dashboard', (req, res) => {
  console.log("req is: "+req)
  if (req.session.user) {
    db.User.findOne( {
      // Grab the logged in user
      where: {
        id: req.session.user.id
      }
    }).then( theuser => {
      console.log('user is' +theuser)
      res.render('dashboard', {
        user: theuser,
        user: req.session.user
      })
    })
  } else {
    res.redirect('/log-in')
  }
})

module.exports = router;
