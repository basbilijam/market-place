const express = require ('express'),
      session = require ('express-session'),
      sequelize = require ('sequelize'),
      fs = require ('fs'),
      bodyParser = require('body-parser'),
      morgan = require('morgan'),
      app = express(),
      authentication = require(__dirname +'/routes/authentication'),
      db = require(__dirname + '/modules/m-db'),
      register = require(__dirname +'/routes/register'),
      search = require (__dirname + '/modules/m-search');

// sessions
app.use(session({
      secret: 'secure',
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false }
    }));

app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use('/', express.static( __dirname+ '/public') );

app.use('/', authentication);
app.use('/', register);
app.use('/', search);

// route to index page
app.get('/', (req, res) => {
  res.render('index', {
    user: req.session.user
  })
})

app.listen(4001, (req, res) => {
  console.log('Server running on port 4001');
});
