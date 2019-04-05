const fs = require('fs');

const image = fs.createReadStream(
  './storage/eight.jpg',
  // ,  { highWaterMark: 128 * 1024 }
);
const dest = fs.createWriteStream('./storage/back.jpg');
// image.on('data', (chunk) => {
//   dest.write(chunk, (err) => {
//     if (err) console.error('error occurred: ', err.message);
//     else console.log('write data', chunk.length);
//     console.log(chunk);
//   });
// });
// image.on('end', () => {
//   console.log('read end');
// });
// image.on('close', () => {
//   console.log('stream close.');
// });
dest.on('pipe', (src) => {
  console.log('piping');
});
image.on('data', (chunk) => {
  console.log('piping : ', chunk.length);
});
image.on('end', () => {
  console.log('piping end');
});
image.pipe(dest);
