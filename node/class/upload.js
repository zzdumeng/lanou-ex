/* eslint-disable no-cond-assign */
const http = require('http');
const formidable = require('formidable');
const url = require('url');
const util = require('util');
const fs = require('fs');
const path = require('path');
// import http from 'http';

const handler = (req, res) => {
  const urlObj = url.parse(req.url);
  if (urlObj.pathname === '/upload' && req.method.toLowerCase() === 'post') {
    const form = new formidable.IncomingForm();
    // limit to 100 kb
    form.maxFileSize = 100 * 1024;
    form.parse(req, (err, fields, files) => {
      // if (err) {
      //   res.end('fail.');
      // } else {
      //   util.inspect(fields, files);
      //   res.end('success');
      // }
      if (err) {
        res.end(`failed: ${err.message}`);
        return;
      }
      const pt = files.avatar.path;
      const pathInfo = path.parse(pt);
      fs.createReadStream(pt).pipe(fs.createWriteStream(`./storage/${pathInfo.name}`));
      console.log('parsed');
      res.writeHead(200, { 'content-type': 'text/plain' });
      res.write('received upload:\n\n');
      res.end(util.inspect({ fields, files }));
    });
    return;
  }
  res.setHeader('content-type', 'text/html; charset=utf-8;');
  const file = fs.createReadStream('./public/upload.html');
  file.pipe(res);
  file.on('end', () => {
    res.end();
  });

  // fs.readFile('./public/upload.html', 'utf8', (err, data) => {
  //   r
  // });
  // res.write(`
  // <form enctype="multipart/form-data" action="/upload" method="post">
  // <input name="name"  type="text"/>
  // <input name="age"  type="number"/>
  // <input name="avatar"  type="file"/>
  // <input type="submit" value="go" />
  // </form>
  // `);
  // res.end();
};

const app = http.createServer(handler);
app.listen(8080, () => {
  console.log('yes, I am listening on 8080...');
});
