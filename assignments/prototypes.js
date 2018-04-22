/*
  Object oriented design is commonly used in video games.  For this part of the assignment
  you will be implementing several classes with their correct inheritance heirarchy.
  In this file you will be creating three classes: GameObject, CharacterStats, Humanoid.  
  At the bottom of this file are 3 objects that all inherit from Humanoid.  Use the objects at the bottom of the page to test your classes.
  
  Each class has unique properites and methods that are defined in their block comments below:
*/
  
/*
  === GameObject ===
  * createdAt
  * dimensions
  * destroy() // prototype method -> returns the string 'Object was removed from the game.'
*/
function GameObject (obj) {
  this.createdAt = obj.createdAt;
  this.dimensions = obj.dimensions;
};

// GameObject.prototype.destroy = () => `${this.name} was removed from the game.`;
GameObject.prototype.destroy = function() {
  return `${this.name} was removed from the game.`;
};

/*
=== CharacterStats ===
* hp
* name
* takeDamage() // prototype method -> returns the string '<object name> took damage.'
* should inherit destroy() from GameObject's prototype
*/

function CharacterStats (obj) {
  GameObject.call(this, obj);
  this.hp = obj.hp;
  this.name = obj.name;
};

// CharacterStats.prototype = Object.create(GameObject.prototype);
CharacterStats.prototype = {...GameObject.prototype};

CharacterStats.prototype.takeDamage = function() {
  return `${this.name} took damage.`;
};

/*
=== Humanoid ===
* faction
* weapons
* language
* greet() // prototype method -> returns the string '<object name> offers a greeting in <object language>.'
* should inherit destroy() from GameObject through CharacterStats
* should inherit takeDamage() from CharacterStats
*/
function Humanoid (obj) { 
 CharacterStats.call(this, obj);
  this.faction = obj.faction;
  this.weapons = obj.weapons;
  this.language = obj.language;
};

//Overwrite my prototype with {this stuff, which is CharacterStats}
// Humanoid.prototype = Object.create(GameObject.prototype);
Humanoid.prototype = {...CharacterStats.prototype};

Humanoid.prototype.greet = function() {
 return `${this.name} offers a greeting in ${this.language}.`;
}

//  let test = new Humanoid({
//   "name": "Bob",
//   "hp": 10,
//   "createdAt": '"Today"',
//   "dimensions": 10,
//   "faction": "Sleepers",
//   "weapons": "Pajamas",
//   "language": "Sleep Talk"
// });
// console.log(test);

/*
* Inheritance chain: Humanoid -> CharacterStats -> GameObject
* Instances of Humanoid should have all of the same properties as CharacterStats and GameObject.
* Instances of CharacterStats should have all of the same properties as GameObject.
*/

//Test you work by uncommenting these 3 objects and the list of console logs below:
const mage = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 2,
    width: 1,
    height: 1,
  },
  hp: 5,
  name: 'Bruce',
  faction: 'Mage Guild',
  weapons: [
    'Staff of Shamalama',
  ],
  language: 'Common Toungue',
});

const swordsman = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 2,
    width: 2,
    height: 2,
  },
  hp: 15,
  name: 'Sir Mustachio',
  faction: 'The Round Table',
  weapons: [
    'Giant Sword',
    'Shield',
  ],
  language: 'Common Toungue',
});

const archer = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 1,
    width: 2,
    height: 4,
  },
  hp: 10,
  name: 'Lilith',
  faction: 'Forest Kingdom',
  weapons: [
    'Bow',
    'Dagger',
  ],
  language: 'Elvish',
});

// console.log(mage.createdAt); // Today's date
// console.log(archer.dimensions); // { length: 1, width: 2, height: 4 }
// console.log(swordsman.hp); // 15
// console.log(mage.name); // Bruce
// console.log(swordsman.faction); // The Round Table
// console.log(mage.weapons); // Staff of Shamalama
// console.log(archer.language); // Elvish
// console.log(archer.greet()); // Lilith offers a greeting in Elvish.
// console.log(mage.takeDamage()); // Bruce took damage.
// console.log(swordsman.destroy()); // Sir Mustachio was removed from the game.

// Stretch task: 
// * Create Villain and Hero classes that inherit from the Humanoid class.  
// * Give the Hero and Villains different methods that could be used to remove health points from objects which could result in destruction if health gets to 0 or drops below 0;
// * Create two new objects, one a villain and one a hero and fight it out with methods!
function Villain (obj) {
  Humanoid.call(this, obj); 
}

Villain.prototype = Object.create(Humanoid.prototype);

Villain.prototype.bigHit = () => {
  good.hp -= 6;
  good.takeDamage();
  return `Take this ${good.name}!`;
}

Villain.prototype.addHealth = () => {
  bad.hp += 3;
  return `I heal myself. Take that ${good.name}!`;
}

function Hero (obj) {
  Humanoid.call(this, obj);
}

Hero.prototype = Object.create(Humanoid.prototype);

Hero.prototype.bigSmack = () => {
  bad.hp -= 6;
  bad.takeDamage();
  return `Take this ${bad.name}!`;
}

Hero.prototype.healthUp = () => {
  good.hp += 3;
  return `I heal myself. Take that ${bad.name}!`;
}

const bad = new Villain({
  createdAt: new Date(),
  dimension: {
    length: 2,
    width: 2,
    height: 2
  },
  name: 'ParLeVousFrancais',
  hp: 15,
  faction: 'European',
  weapons: [
    'Rapier',
    'Knife'
  ],
  language: 'French',
});

 const good = new Hero({
  createdAt: new Date(),
  dimension: {
    length: 2,
    width: 2,
    height: 2
  },
  name: 'SugoiSugoi',
  hp: 15,
  faction: 'Asian',
  weapons: [
    'Katana',
    'Knife'
  ],
  language: 'Japanese',
});

function fightSequence() {
  let randomNum = null;
  while(good.hp && bad.hp > 0) {
    console.log(good.bigSmack());
    console.log(bad.bigHit());
    if (good.hp <= 8) {
      randomNum = Math.floor(Math.random() * 11);
      if (randomNum <= 4) {
        console.log(`${good.name} is more resolute than ever to win! Health increases.`);
        good.hp += 4;
        console.log(`Hero's health: ${good.hp}`);
      }
    }
    if (bad.hp <= 0) {
      console.log(`${good.name} is the victor!`);
      return bad.destroy();
    }
    else if (good.hp <= 0) {
      console.log(`${bad.name} is the victor`);
      return good.destroy();
    }
  }
}
fightSequence();