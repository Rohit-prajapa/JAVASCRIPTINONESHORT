const sym = Symbol('Rohit');


let user = {
  name: "Rohit",
  [sym]:"Prajapati",
  age: 30,
  Emails: "rahulprajapati69424@gmail.com",
  location: "Varanasi",
};

user.greeting = function () {
  console.log("Hello Rohit");

}

user.greet = function () {
  console.log(`hello How are u ${this.name}`);
}

console.log(user.greeting());
console.log(user.greet());





// console.log(user);
// console.log(user.name);
// console.log(user.location);
// console.log(user['age']);
// console.log(user['age']);
// console.log(user[sym]);





