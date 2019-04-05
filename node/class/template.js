/* eslint-disable no-console */
const express = require('express')
const ejs = require('ejs')
const qs = require('querystring')

const app = express()
// settings
app.set('view engine', 'ejs')
app.set('views', './views/ejs')
app.get('/', (req, res) => {
  res.render('home', { name: 'du' })
})
const port = 8080
app.listen(port, () => {
  console.log(`server listening on ${port}...`)
})
