const express = require ('express'),
      session = require ('express-session'),
      router = express.Router(),
      db = require(__dirname +'/../modules/m-db');



//setting route -> log-in page
router.get('/login', (req, res) => {
  if (req.session.user) {
    res.render('dashboard', {
      user: req.session.user
    });
  } else {
    res.render('login');
  }
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

router.get('/logout', (req,res) => {
      req.session.destroy( (err) => {
        console.log('Log Out'+req.session);
        if (err) {
          console.log(err);
        } else {
          res.redirect('/');
        }
      });
    });


module.exports = router;
