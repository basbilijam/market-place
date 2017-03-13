
const express = require ('express'),
      app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use('/', express.static( __dirname+ '/public') );


app.get('/', (req,res) =>{
  res.send('HELLO!')
})


app.listen(4001, (req, res) => {
  console.log('Server running on port 4001');
});
