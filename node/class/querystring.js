const qs = require('querystring');
const util = require('util');

const query = `
  name=dumeng&members[3]=3&members[2]=5&members[2]=4&country.main=china&country.other=usa
`;

const res = qs.parse(query);
console.log(util.inspect(res));
const to = { map: { colors: ['blue', 'red', 'cyan'] } };
const q = qs.stringify(to.map);
console.log(q);
