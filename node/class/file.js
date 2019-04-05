const http = require('http');
const url = require('url');
const qs = require('querystring');
const bullet = require('./src/bullet');

const fileHandler = (req, res) => {
  const html = `
 <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <link rel="stylesheet" href="main.css">
</head>
<body>
  <div class='a'>hello server</div>

  <form action="/" method='post'>
    <input type="text" name='name' value='dm'>
    <input type="text" name='name' value='md'>
    <input type="text" name='favs[0]' value='drive'>
    <input type="text" name='favs[0]' value='balling'>
    <input type="submit" value='submit'>
  </form>
</body>
</html> `;
  const css = `
    .a {background: red;}
  `;
  console.log('requesting ', req.url);
  switch (req.url) {
    case '/file.html':
      res.setHeader('content-type', 'text/html; charset=utf-8');
      res.end(html);
      break;
    case '/main.css':
      res.setHeader('content-type', 'text/css');
      res.end(css);
      break;
    case '/': {
      res.setHeader('content-type', 'application/json');
      req.socket.on('data', ())
      const urlObj = url.parse(req.url, true);
      console.log(urlObj);
      // const query = qs.parse(req.url.query);
      res.end(JSON.stringify(urlObj.query));
      break;
    }
    default:
      break;
  }
};

const handler = (req, res) => {};

const app = http.createServer(fileHandler);
const port = parseInt(process.argv[2], 10) || 8080;

app.listen(port, () => {
  console.log(`service is listening at ${port}...`);
});
