
const express = require ('express'),
      app = express();



app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use('/', express.static( __dirname+ '/public') );


// route to index page
app.get('/', (req, res) => {
  res.render('index')
})


app.listen(4001, (req, res) => {
  console.log('Server running on port 4001');
});
