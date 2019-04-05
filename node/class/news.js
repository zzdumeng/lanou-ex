/* eslint-disable no-console */
const express = require('express')
const bodyParser = require('body-parser')
const faker = require('faker/locale/zh_CN')
const path = require('path')
const moment = require('moment')
const mongoose = require('mongoose')

const { Schema } = mongoose

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'pug')
app.set('views', './views')

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
// create schema and model
const UserSchema = new Schema(
  {
    name: String,
    password: String,
    register_date: Date,
  },
  { collection: 'users' },
)
const NewsSchema = new Schema(
  {
    title: String,
    content: String,
    publish_date: { type: Date, default: Date.now() },
    update_date: { type: Date, default: Date.now() },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { collection: 'news' },
)
const User = mongoose.model('User', UserSchema)
const News = mongoose.model('News', NewsSchema)
// Works
// MyModel.findOne((error, result) => {
//   /* ... */
// })
/**
 * add some faker data
 */
async function initDB() {
  let users = await User.find().exec()
  const ops = []
  if (users.length < 5) {
    // create  some users
    const n = 5 - users.length
    for (let i = 0; i < n; i += 1) {
      ops.push(User.create({ name: faker.name.findName(), password: faker.random.uuid() }))
    }
    await Promise.all(ops)
  }
  // create some posts
  const news = await News.find().exec()
  users = await User.find().exec()
  const nops = []
  if (news.length < 5) {
    for (let i = 0; i < 5 - news.length; i += 1) {
      const publish = faker.date.past()
      const update = moment(publish)
        .add(faker.random.number(10), 'd')
        .toDate()
      nops.push(
        News.create({
          title: faker.random.words(),
          content: faker.random.words(),
          publish_date: publish,
          update_date: update,
          author: users[faker.random.number(users.length - 1)],
        }),
      )
    }
    await Promise.all(nops)
  }
}
initDB()
app.get('/admin', (req, res) => {
  res.render('admin')
})
app.get('/user', (req, res) => {
  User.find({}, '_id name')
    .exec()
    .then((docs) => {
      res.json(docs)
    })
    .catch((err) => {
      res.json({ error: 1, message: err.message })
    })
})
app
  // get all news
  .get('/news', (req, res) => {
    News.find()
      .populate('author', '_id name')
      .exec()
      .then((docs) => {
        res.json(docs)
      })
      .catch((err) => {
        res.send(err.message)
      })
  })

app.post('/news/update/:id', (req, res) => {
  const { id } = req.params
  const { title, content, author } = req.body
  News.findById(id)
    .exec()
    .then((doc) => {
      doc.title = title
      doc.content = content
      doc.author = mongoose.Types.ObjectId(author)
      return doc.save()
    })
    .then(doc => doc.populate('author', '_id name').execPopulate())
    .then(result => res.json(result))
    .catch(err => res.json({ error: 1, message: err.message }))
  // News.update({ id }, { title, content })
  //   .exec()
  //   .then(() => {
  //     res.json({ success: true })
  //   })
  //   .catch((err) => {
  //     res.json({ error: 1, detail: { id }, message: err.message })
  //   })
})
app.post('/news/delete/:id', (req, res) => {
  const { id } = req.params
  if (!id) {
    res.json({ error: 1, message: 'arguments error' })
    return
  }
  News.deleteOne({ _id: id })
    .exec()
    .then(() => {
      res.json({ operation: 'delete', success: 1, detail: { id } })
    })
    .catch((err) => {
      res.json({ error: 1, message: err.message })
    })
})
app.post('/news/new', (req, res) => {
  // add a news item
  // FIXME:
  const { title, content, author } = req.body
  const add = new News({ title, content, author: mongoose.Types.ObjectId(author) })
  add
    .save()
    .then(doc => doc.populate('author', '_id name').execPopulate())
    .then(doc => res.json(doc))
    .catch((err) => {
      res.json({ error: 1, message: err.message })
    })
})

// for static resources

app.get('/:static/*', (req, res) => {
  const statics = ['node_modules', 'public', 'uploads']
  const ind = statics.indexOf(req.params.static)
  if (ind > -1) {
    // send static file
    console.log('request file: ', statics[ind], req.params[0])
    const p = path.join(__dirname, statics[ind], req.params[0])
    res.sendFile(p)
  } else {
    res.status(404).send('<h1>404 not found</h1>')
  }
})

app.get('*', (req, res) => {
  res.status(404).send('<h1>404 not found!</h1>')
})

const port = 8080
app.listen(port, () => {
  console.log(`server listening on ${port}...`)
})
