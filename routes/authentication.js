const express = require ('express'),
      session = require ('express-session'),
      bodyParser = require('body-parser'),
      router = express.Router(),
      db = require(__dirname +'/../modules/m-db');

router.use(bodyParser.urlencoded({ extended: false }));

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
  console.log('The username is', req.body.username);
  db.User.findOne( {
    where: {
      username: req.body.username
    }
  }).then(user => {
    bcrypt.compare(req.body.password, hash, (err, res) =>{
      if (res === true) {
        req.session.visited = true;
        console.log(req.session.visited);
        req.session.user = user;
        console.log(req.session.user);
        res.render('dashboard', { user: user });
      } else {
        res.render('wrongpassword');
      }
    })
  }).catch(err => {
    res.render('login');
  });
});

router.get('/logout', (req,res) => {
  req.session.destroy( (err) => {
    console.log('Log Out: '+req.session);
    if (err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
});

module.exports = router;
