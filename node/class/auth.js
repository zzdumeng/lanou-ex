/* eslint-disable no-console */
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const multer = require('multer')
const path = require('path')
const fs = require('fs').promises
const qs = require('querystring')

const app = express()
const authFile = './storage/auth.data'
app.set('view engine', 'pug')
app.set('views', './views')
app.set('jsonp callback name', 'cb')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
// for multipart/form-data post
const upload = multer({ dest: 'uploads/' })

app.get('/home', (req, res) => {
  res.render('home', { username: req.cookies.username })
})

app
  .get('/login', (req, res) => {
    res.render('auth', { login: true })
  })
  .post('/login', async (req, res) => {
    // // check if the file exists
    // const f = await fs.access(authFile)
    // if (f) {
    //   // not exists yet
    //   await fs.
    // }
    // check pwd and name
    const { username, password } = req.body
    let data = await fs.readFile(authFile, { encoding: 'utf8', flag: 'w+' })
    data = data || '{}'
    const json = JSON.parse(data)
    if (json[username]) {
      const pw = json[username].password
      if (pw === password) {
        // success!
        res.cookie('username', username)
        res.json({ success: 1, message: '登录成功' })
      } else {
        res.json({ error: 1, message: '密码不正确' })
      }
    } else {
      res.json({ error: 1, message: '你还没有注册' })
    }
  })

app
  .get('/register', (req, res) => {
    res.render('auth', { login: false })
  })
  .post('/register', async (req, res) => {
    const { username, password, passwordAgain } = req.body
    if (password !== passwordAgain) {
      res.json({ error: 1, message: '密码不一致' })
      return
    }
    // format verify
    const usernameRe = /\w{6,16}/ // 6~16 characters
    const pwRe = /\w{6,16}/

    if (usernameRe.test(username) && pwRe.test(password)) {
      let data = await fs.readFile(authFile, { flag: 'w+', encoding: 'utf8' })
      data = data || '{}'
      const json = JSON.parse(data)
      if (json[username]) {
        res.json({ error: 1, message: '用户名已存在' })
        return
      }
      // save
      json[username] = { password, avatar: '', email: '' }
      await fs.writeFile(authFile, JSON.stringify(json))
      res.json({ success: 1, message: '注册成功' })
    } else {
      res.json({ error: 1, message: '用户名或密码格式不正确' })
    }
  })

app
  .get('/profile', (req, res) => {
    res.render('profile')
  })
  .post('/profile', upload.single('avatar'), (req, res) => {
    // update profile
    // TODO: only support avatar update now
    if (req.file) {
      console.log(req.file)

      res.send({ success: 1, avatar: req.file.path })
    } else {
      res.json({ error: 1, message: 'should contain a file' })
    }
  })

// app.get('/uploads/*', (req, res) => {
//   console.log('request file: ', req.params[0])

//   const p = path.join(__dirname, 'uploads', req.params[0])
//   res.sendFile(p)
// })
// app.get('/node_modules/*', (req, res) => {
//   console.log('request file: ', req.params[0])

//   const p = path.join(__dirname, 'node_modules', req.params[0])
//   res.sendFile(p)
// })
// app.get('/public/*', (req, res) => {
//   console.log('request file: ', req.params[0])

//   const p = path.join(__dirname, 'public', req.params[0])
//   res.sendFile(p)
// })

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

const port = 8080
app.listen(port, () => {
  console.log(`server listening on ${port}...`)
})
