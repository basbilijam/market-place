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
  listing: sequelize.BOOLEAN,
  companyname: sequelize.STRING,
  location: sequelize.STRING,
  locationurl: sequelize.STRING,
  style: sequelize.STRING
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
          listing: false,
          companyname: null,
          location: null,
          style: null
  		  } ),
        User.create ( {
          username: "Nyle",
          email: "nyle@nyle.com",
          password: hash,
          listing: true,
          companyname: "Nyle's delights",
          location: "Kinkerstraat 12 Amsterdam",
          style: "Korean"
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
