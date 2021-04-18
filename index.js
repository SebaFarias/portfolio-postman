const express = require('express')
const mailgun = require('mailgun-js')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
require('dotenv').config()

const app = express()

const server_port = process.env.YOUR_PORT || process.env.PORT || 5000
const server_host = process.env.YOUR_HOST || '0.0.0.0';

const mg = mailgun({
  apiKey: process.env.MAIL_GUN_API_KEY,
  domain: process.env.MAIL_GUN_DOMAIN,
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(morgan("dev"))
app.use(helmet())

app.listen( server_port, server_host, () =>{
  console.log( `Waitting for your Job Offers on ${server_host}:${server_port} ` )
})

app.get('/', ( req, res ) => {
  res.send("Welcome to my Job hounting mail API 😎")
})

app.post('/api/v1', ( req, res ) => {
  const data = req.body

  const mailOptions = {
    from: data.email,
    to: 'sebastian.fariasb@usach.cl',
    subject: `${data.subject}`,
    html: `
      <p>${data.name}<p>
      <p>${data.email}<p>
      <p>${data.message}<p>
    `
  }
  mg.messages().send( mailOptions,( error, response) => {
    if( error ){
      console.log(error)
      res.status(400).send(error)
    }
    else{
      res.send("Success")
    }
  })
})

