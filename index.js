const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const port = process.env.PORT
const path = require('path');

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, './public')))

require('./startup/router')(app)
app.listen(port,()=>{console.log('Listening to port ::',port)})