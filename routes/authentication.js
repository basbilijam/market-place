const express = require ('express'),
      session = require ('express-session'),
      router = express.Router();



// setting route -> log-in page
router.get('/login', (req, res) => {
  // if (req.session.user) {
  //   res.render('dashboard', {
  //     user: req.session.user
  //   });
  // } else {
    res.render('login');
  //}
});


router.post('/login', (req, res) => {
  db.User.findOne( {
    where: {
      username: req.body.username
    },
    include: [ db.Listing ]
  }).then(user => {

    if (user.password === req.body.password) {
      req.session.visited = true;
      req.session.user = user;
      res.render('dashboard', {
        user: user
      });
    } else {
      res.render('/login');
    }
  }).catch(err => {
    res.render('Please try again Username/Password wrong');
  });
});

module.exports = router;
