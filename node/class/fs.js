/* eslint-disable no-console */
const fs = require('fs');
const util = require('util');

// fs.readFile('./storage/poem.txt', (err, data) => {
//   if (err) {
//     console.error('read file error: ', err.message);
//     return;
//   }
//   console.group();
//   console.log('file ocntent: ');
//   console.log(data);
//   console.groupEnd();
// });

// // write file
// fs.writeFile('./storage/save.txt', '钗中待时飞', { flag: 'a', encoding: 'utf-8' }, (err) => {
//   if (err) {
//     console.log(err.message);
//   }
// });

function copy(src, dest) {
  let srcFile;
  let destFile;
  let srcEncoding = null;
  let destEncoding = null;
  if (util.types.isStringObject(src)) {
    srcFile = src;
  } else {
    srcFile = src.file;
    srcEncoding = src.encoding;
  }
  if (util.types.isStringObject(dest)) {
    destFile = dest;
  } else {
    destFile = dest.file;
    destEncoding = dest.encoding;
  }
  fs.readFile(srcFile, srcEncoding, (err, data) => {
    if (err) {
      console.error('read source file failed: ', err.message);
      return;
    }
    // const b = Buffer.from(data, srcEncoding);
    fs.writeFile(destFile, data, { encoding: destEncoding }, (err) => {
      if (err) {
        console.error('write content to file failed: ', err.message);
        return;
      }
      console.log('copy success.');
    });
  });
}
function testCopy() {
  // test
  copy(
    { file: './storage/eight.jpg', encoding: null },
    { file: './storage/copy.jpg', encoding: 'utf8' },
  );
}
// testCopy()
function dir() {
  fs.mkdir('./storage/files/novels', { recursive: true, mode: 0o777 }, (err) => {
    if (err) console.log('result ', err.message);
    else console.log('dir created');
  });
  fs.rename('./storage/files/novels', './storage/novels', (err) => {
    if (err) console.log('rename file failed.');
    else console.log('rename file success');
  });
  fs.stat('./storage/non', (err, stat) => {
    if (err) console.log(err);
  });
}
// dir();

function testMkdir() {
  fs.exists('./abc', (b) => {
    // if (!b) {
    //   fs.mkdir('./abc', () => {
    //     console.log('mkdir success');
    //   });
    // }
    console.log('donot know');
    fs.createReadStream('./storage/copy.txt').pipe(fs.createWriteStream('./abc/1.txt'));
    console.log('after');
  });
}
testMkdir();
