/* env node */
const path =require('path')

const p1 = path.resolve(__dirname, 'src/img/design/1.png')
const p2 = path.resolve(__dirname, 'src/img')

// console.log(path.parse(__dirname));
// console.log(path.relative(p1, p2));
console.log(path.relative(p2, p1));

