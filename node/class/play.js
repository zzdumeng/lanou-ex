/* eslint-disable no-console */
/* eslint-disable func-names */
const util = require('util');

function Emperor(name) {
  this.name = name;
}

function Person() {
  this.specie = 'ape';
  this.die = function () {
    console.log('die');
  };
}
Person.prototype.live = function () {
  console.log('living');
};

util.inherits(Emperor, Person);
const em = new Emperor('qianlong');
em.live();
console.log(em.specie);
