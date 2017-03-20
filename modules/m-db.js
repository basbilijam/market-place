// set up database connection
const sequelize = require ('sequelize')
const pg = require('pg')
const express = require ('express')
const bcrypt = require('bcrypt-nodejs')

const db = new sequelize( 'marketplace', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres'
} )

//// Model
// User

const User = db.define( 'user', {
	username: sequelize.STRING,
	email: sequelize.STRING,
  // Password not hashed yet!!!
	password: sequelize.STRING,
  company: sequelize.STRING,
  location: sequelize.STRING,
  postalcode: sequelize.TEXT,
  locationurl: sequelize.TEXT,
  style: sequelize.STRING,
  filename: sequelize.STRING
} )

db
  .sync({ force: true })
  .then( (err) => {
    console.log('It worked!')
    bcrypt.hash("password", null, null, (err, hash) => {
      return Promise.all ([
        User.create( {
    			username: "Bas",
    			email: "bas@bas.com",
    			password: hash,
          company: "Kentucky Fried Chicken",
          location: "Slijkstraat 5, Amsterdam",
          postalcode: "1012 CM",
          locationurl: "https://maps.googleapis.com/maps/api/staticmap?center=Slijkstraat%205%2C%20Amsterdam&zoom=15&size=500x400&maptype=roadmap&markers=color%3Agreen%7Clabel%3AA%7Cshadow%3Atrue%7CSlijkstraat%205%2C%20Amsterdam&key=AIzaSyBy1LYoxta3n2-pwyI5ipEr8vZzcB1Z_Yw",
          style: "Dutch"
  		  } ),
        User.create ( {
          username: "Nyle",
          email: "nyle@nyle.com",
          password: hash,
          company: "Nyle's delights",
          location: "Kinkerstraat 12 Amsterdam",
          postalcode: "1234AB",
          locationurl: "https://maps.googleapis.com/maps/api/staticmap?center=Kinkerstraat%2012%2C%20Amsterdam&zoom=15&size=500x400&maptype=roadmap&markers=color%3Agreen%7Clabel%3AA%7Cshadow%3Atrue%7CKinkerstraat%2012%2C%20Amsterdam&key=AIzaSyBy1LYoxta3n2-pwyI5ipEr8vZzcB1Z_Yw",
          style: "Korean"
        }),
        User.create ( {
          username: "Klaus",
          email: "klaus@nyle.com",
          password: hash,
          company: "Klau Currywurst",
          location: "Waterlooplein 12 Amsterdam",
          postalcode: "2010AB",
          locationurl: "https://maps.googleapis.com/maps/api/staticmap?center=Waterlooplein%2012%2C%20Amsterdam&zoom=15&size=500x400&maptype=roadmap&markers=color%3Agreen%7Clabel%3AA%7Cshadow%3Atrue%7CWaterlooplein%2012%2C%20Amsterdam&key=AIzaSyBy1LYoxta3n2-pwyI5ipEr8vZzcB1Z_Yw",
          style: "German"
        })
      ])
    })
  } )
  .catch( console.log.bind( console ) )

// exporting database as a module
module.exports = {
  conn: db,
  User: User
}
