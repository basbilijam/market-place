
const express = require ('express'),
      session = require ('express-session'),
      sequelize = require ('sequelize'),
      fs = require ('fs'),
      bodyParser = require('body-parser'),
      morgan = require('morgan'),
      app = express(),
      authentication = require(__dirname +'/routes/authentication'),
      db = require(__dirname + '/modules/m-db'),
      register = require(__dirname +'/routes/register');

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


// route to index page
app.get('/', (req, res) => {
  res.render('index')
})




//  for the search query
// req.body.search
//
//
// wrap query into function(promise pass the resolve to then)
// router.post('/search', (req,res)=>{
//
//   sequelize.query('SELECT * FROM users WHERE name LIKE :search_name ',
//   { replacements: { search_name: 'ben%'  }, type: sequelize.QueryTypes.SELECT }
// ).then(function(projects) {
//   res.render('search', {listings: foundlistings, query: searchQuery});
//   console.log(projects)
// }).catch( err => {
//   console.log(err);
// })
// })


app.listen(4001, (req, res) => {
  console.log('Server running on port 4001');
});
