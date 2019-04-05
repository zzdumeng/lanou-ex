const EventEmitter = require('events');

class Satellite extends EventEmitter {
  constructor(name) {
    super();
    this.name = name;
    this.on('collide', this.onCollide);
  }

  onCollide(other) {
    console.log(`I [${this.name}] collide with ${other.name}.`);
  }

  collide(other) {
    this.emit('collide', other);
    other.emit('collide', this);
  }
}

const dong = new Satellite('dongfanghong');
const thunder = new Satellite('thunder');
// dong.collide(thunder);

class GameObject extends EventEmitter {
  constructor (props) {
    super();
    this.on('log', this.log);
  }
  log(...args) {
    console.log(...args);
  }
  
}

class Weapon extends GameObject {
  constructor ({}) {
    super(props);
    
  }
  
}
class Gun extends EventEmitter {
  constructor(name, { bullets = 10, power = 1 }) {
    super();
    this.name = name;
    this.bullets = bullets;
    this.power = power;

    this.on('shoot', this.shoot);
  }

  shoot(enemy) {
    if (this.bullets > 0) {
      this.bullets -= 1;
      enemy.emit('shot', this);
    } else {
      console.log('no more bullet');
    }
  }
}

class Enemy extends EventEmitter {
  constructor(name, { health = 20 }) {
    super();
    this.name = name;
    this.health = health;

    this.on('shot', this.onShot);
    this.once('die', this.die);
  }

  onShot(shooter) {
    if (this.health > 0) {
      this.health -= shooter.power;
      console.log('ahhhhhh....');
      if (this.health <= 0) {
        this.emit('die', shooter);
      }
    } else {
      this.emit('shotDeadBody');
    }
  }

  die(shooter) {
    console.log(`[${this.name}] I was killed by ${shooter.name}`);
    this.on('shotDeadBody', this.onShotDeadBody);
  }

  onShotDeadBody() {
    console.log(`[${this.name}] I am already dead!!`);
  }

  reborn() {
    this.once('die', this.die);
    this.off('shotDeadBody', this.onShotDeadBody);
  }
}

const silverEagle = new Gun('沙漠之鹰', { power: 10, bullets: 3 });
const giant = new Enemy('百目巨人', { health: 20 });

silverEagle.emit('shoot', giant);
silverEagle.emit('shoot', giant);
silverEagle.emit('shoot', giant);
silverEagle.emit('shoot', giant);
silverEagle.emit('shoot', giant);
