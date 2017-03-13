// set up database connection
const sequelize = require ('sequelize')
const pg = require('pg')
const express = require ('express')

const db = new sequelize( 'marketplace', 'bas', 'bas', {
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
  type: sequelize.STRING
} )

db
  .sync({ force: true })
  .then( (err) => {
    console.log('It worked!')
    return Promise.all ([
      User.create( {
  			username: "Bas",
  			email: "bas@bas.com",
  			password: "bas",
        listing: FALSE,
        companyname: null
        location: null
        style: null
		  } ),
      User.create ( {
        username: "Nyle",
        email: "nyle@nyle.com",
        password: "nyle",
        listing: TRUE,
        companyname: "Nyle's delights"
        location: "52.3702157, 4.895167899999933"
        style: "Korean"
      })
    ])
  } )
  .catch( console.log.bind( console ) )

// exporting database as a module
module.exports = {
  conn: db,
  User:User
}
