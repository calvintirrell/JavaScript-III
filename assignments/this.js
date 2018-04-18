/* The for principles of "this";
* in your own words. explain the four principle for the "this" keyword below.
*
* 1. window binding: this becomes window or console Object
* 2. implicity binding: when a function is invoked by with a . in front of it, the obj before the . is this
* 3. new binding: when a constructor is used, this refers to a specific instance of the obj that is made and returned
* 4. explicit binding: specifically (or explicitly) passing this into call() or apply()
*
* write out a code example of each explanation above
*/

// Principle 1
// code example for Window Binding
name = "D'Artangnan";
function sayName(name) {
    console.log(this.name);
    return name;
}
sayName("D'Artagnan");

// Principle 2
// code example for Implicit Binding
var sayName = function(obj) {
    obj.sayName = function() {
        console.log(`My name is ${this.name} and I am ${this.age} years old.`);
    }
};

var me = {
    name: 'Boba Fett',
    age: 9000
};
sayName(me);
me.sayName();

// Principle 3
// code example for New Binding
function person(greeter) {
    this.greet = 'Hello ';
    this.greeter = greeter;
    this.speak = function() {
      console.log(this.greet + this.greeter);
    //   console.log(this);
    };
  }
  
  const wubba = new person('Bubba');
  const bubba = new person('Wubba');
  wubba.speak();
  bubba.speak();

// Principle 4
// code example for Explicit Binding
var sayName = function(lang1, lang2, lang3) {
    console.log(`My name is ${this.name} and I am ${this.age} years old. I know ${lang1}, ${lang2}, ${lang3}.`)
}
var mom = {
    name: "mom",
    age: 999,
    sayName: function() {
        console.log(`My name is ${this.name} and I am ${this.age} years old.`)
    }
};
var languages = ['Javascript', 'Ruby', 'Python'];
sayName.apply(mom, languages);
// mom.sayName();