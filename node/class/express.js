/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const util = require('util');

const app = express();
app.set('views', './views');
app.set('view engine', 'pug');
app.set('jsonp callback name', 'cb');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// middlewares
const centerHandler = (req, res, next) => {
  req.money = 2000000;
  next();
};
const provinceHandler = (req, res, next) => {
  req.money *= 0.5;
  next();
};
const cityHandler = (req, res, next) => {
  req.money *= 0.5;
  next();
};
app.get('/money', centerHandler, provinceHandler, cityHandler, (req, res) => {
  res.send({ money: req.money });
});

// routes
app.get('/', (req, res) => {
  res.send('sdfl');
});

app.get('/case.html', (req, res) => {
  const d = path.join(__dirname, 'public', req.path);
  console.log('file path is ', d);
  res.sendFile(d);
});
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/page/:name/\\d{1,3}', (req, res) => {
  const q = req.params[0];
  res.send(q);
});
app.get('/post', (req, res) => {
  res.render('post');
});
app.post('/post', (req, res) => {
  const { name, age } = req.body;
  res.send({
    success: true,
    name,
    age,
    echo: 'back',
  });
});
app.get('/jsonp', (req, res) => {
  // const fn = req.query.cb;
  const data = { jsonp: true, world: 'virtual world' };
  // res.send(`${fn}(${JSON.stringify(data)})`);
  res.jsonp(data);
});
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, req.path));
});

const port = 8080;
app.listen(port, () => {
  console.log(`server listening on ${port}`);
});
