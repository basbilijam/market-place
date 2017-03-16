const express = require ('express'),
      sequelize = require ('sequelize'),
      fs = require ('fs'),
      bodyParser = require('body-parser'),
      morgan = require('morgan'),
      app = express(),
      db = require(__dirname + '/modules/m-db');



var gmAPI = new GoogleMapsAPI(publicConfig);
var params = {
  center: db.User.location,
  zoom: 15,
  size: '500x400',
  maptype: 'roadmap',
  markers: [
    {
      location: db.User.location,
      label   : 'A',
      color   : 'green',
      shadow  : true
    }
  ]
};

// two different api project need to register same key for both
let locationurl = gmAPI.staticMap(params); // return static map URL
console.log('This should be the google url '+ locationurl);
