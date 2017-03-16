const express = require('express')
      sequelize = require ('sequelize')
      bodyParser = require ('body-parser')
      db = require (__dirname +'/m-db')
      router = express.Router()
      GoogleMapsAPI = require('googlemaps')
      //googleMapsClient = require('@google/maps').createClient({key: 'AIzaSyBqYbVHxiv8ebhz4tUZVH6Byj7s2A_4HqE'});

//search functionality on username
const search = router.post('/search', (req, res) => {
  console.log("req body is " +req.body.search)
  let searchQuery = req.body.search
  db.User.findAll( {
    where: {
      postalcode: {
        $like: searchQuery.substr(0, 2)+'%',
      }
    }
  }).then((result) => {
    console.log("Result is ", result)
    res.render('listings', {results: result})
  }).catch( err => {
    console.log(err);
  })
})


// var publicConfig = {
//   key: 'AIzaSyBy1LYoxta3n2-pwyI5ipEr8vZzcB1Z_Yw',
//   stagger_time:       1000, // for elevationPath
//   encode_polylines:   false,
//   secure:             true // use https
//   //proxy:              'http://127.0.0.1:9999' // optional, set a proxy for HTTP requests
// };
// var gmAPI = new GoogleMapsAPI(publicConfig);
//
// // geocode API
// var geocodeParams = {
//   "address":    "121, Curtain Road, EC2A 3AD, London UK",
//   "components": "components=country:GB",
//   "bounds":     "55,-1|54,1",
//   "language":   "en",
//   "region":     "uk"
// };
//
// gmAPI.geocode(geocodeParams, function(err, result){
//   console.log('The google thingy spits out ', result[3]);
//   console.log('The google error thingy spits out ', err)
// });
//
// gmAPI.reverseGeocode(geocodeParams, function(err, result){
// console.log(result);
// });


// var gmAPI = new GoogleMapsAPI(publicConfig);
// var params = {
//   center: 'Amsterdam Admiralengracht 12',
//   zoom: 15,
//   size: '500x400',
//   maptype: 'roadmap',
//   markers: [
//     {
//       location: '12 Amsterdam Admiralengracht',
//       label   : 'A',
//       color   : 'green',
//       shadow  : true
//     }
//   ]
  // style: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"administrative.province","elementType":"geometry.fill","stylers":[{"visibility":"on"}]},{"featureType":"administrative.locality","elementType":"geometry.fill","stylers":[{"visibility":"on"}]},{"featureType":"administrative.neighborhood","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#ff0000"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"hue":"#ff0000"},{"lightness":"-11"}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"color":"#8d8d8d"}]},{"featureType":"landscape.natural","elementType":"labels.text.fill","stylers":[{"hue":"#ff0000"},{"visibility":"on"}]},{"featureType":"landscape.natural.landcover","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"hue":"#ff0000"}]},{"featureType":"landscape.natural.terrain","elementType":"geometry.fill","stylers":[{"visibility":"off"},{"color":"#ff0000"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"hue":"#ff0000"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"hue":"#ff0000"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#949494"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#3c3c3c"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#b0b0b0"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#4b4e4f"},{"visibility":"on"}]}]

// };

// two different api project need to register same key for both
// let locationurl = gmAPI.staticMap(params); // return static map URL
// console.log('This should be the google url '+ locationurl);

// search googlemaps api
// const search = router.post('/search', (req, res) => {
//   googleMapsClient.geocode({
//     console.log('req body is ', req.body.search)
//     location: req.body.search
//   }, function(err, response) {
//     if (!err) {
//       console.log('Googlemaps results are: ', response.json.results);
//     }
//   });
// })






module.exports = search
