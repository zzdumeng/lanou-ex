/* eslint-disable no-console */
const http = require('http');
const url = require('url');
const util = require('util');
// import http from 'http';

const name = 3;
console.log(name);
const app = http.createServer((req, res) => {
  // res.setHeader('Content-Type', 'text/html; charset=utf-8');
  // res.end('hellow nod and some 中文' );
  const parsed = url.parse(req.url, true);
  const loc = parsed.query.name;
  console.log(parsed);

  if (loc) {
    res.write(util.format('%o', req[loc]));
    res.end();
  } else {
    res.write(util.format('%o', req));
    res.end();
  }
});
app.listen(8080, () => {
  console.log('yes, I am listening on 8080...');
});
