const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const { Schema } = mongoose

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

mongoose
  .connect(
    'mongodb://localhost:27017/node',
    { useNewUrlParser: true },
  )
  .then(() => {
    console.log('connect success')
    // mongoose.connection.close()
  })
  .catch((e) => {
    console.log('connect error')
  })

const PersonSchema = new Schema({ name: String, age: Number }, { collection: 'person' })
const Person = mongoose.model('Person', PersonSchema)
// Works
// MyModel.findOne((error, result) => {
//   /* ... */
// })
app
  .get('/person', (req, res) => {
    const q = Person.find()
    q.exec()
      .then((people) => {
        res.json(people)
      })
      .catch((err) => {
        res.send(err.message)
      })
  })
  .post('/person', (req, res) => {
    const { name, age } = req.body

    const person = new Person({ name, age: parseInt(age, 10) })
    person.save().then((doc) => {
      res.json(doc)
    })
  })
app.post('/person/update', (req, res) => {
  const { name, age } = req.body
  Person.update({ name }, { age })
    .exec()
    .then(() => {
      res.json({ success: true })
    })
})

const port = 8080
app.listen(port, () => {
  console.log(`server listening on ${port}...`)
})
