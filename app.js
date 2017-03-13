
const express = require ('express'),
      session = require ('express-session'),
      app = express(),
      authentication = require(__dirname +'/routes/authentication'),
      register = require(__dirname +'/routes/register');

// sessions
app.use(session({
      secret: 'secure',
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false }
    }));

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use('/', express.static( __dirname+ '/public') );

app.use('/', authentication);
app.use('/', register);
// route to index page
app.get('/', (req, res) => {
  res.render('index')
})



app.listen(4001, (req, res) => {
  console.log('Server running on port 4001');
});
