// let user = new Object()      // this is singlton object
// console.log(user);

// ============================================
// let myuser = {}  // this is not singlton object
// console.log(myuser);

// ===================================================
// this is without singlton method
// let user = {}

// user.name = "Rohit";
// user.age = 30;
// user.location = "Varanasi";

// console.log(user);
// console.log(user['name']);


// =======================================  //


// const user = {
//   name: "Rohit",
//   age: 40,
//   location: "Varanasi",
//   rating: {
//     star: 4.5,
//     noOfView: 1200,
//   },
// };

// console.log(user.name);
// console.log(user.rating.star);



// const obj1 = { 1: "a", 2: "b", }
// const obj2 = { 3: "c", 4: "d" }

// const obj3 = { obj1, obj2 }
// console.log(obj3);

// const obj3 = Object.assign({},obj1, obj2);

// const obj3={...obj1, ...obj2}
// console.log(obj3);



// ===========================================================

// const user = [
//   {
//     id: 1,
//     name: "Rohit",
//     age:20,
//   },
//    {
//     id: 1,
//     name: "Rohit",
//     age:20,
//    },
//     {
//     id: 1,
//     name: "Rohit",
//     age:20,
//     },
//     {
//     id: 1,
//     name: "Rohit",
//     age:20,
//      },
//       {
//     id: 1,
//     name: "Rohit",
//     age:20,
//   },
// ]


// console.log(user);

// console.log(Object.keys(user));
// console.log(Object.values(user));


// =============================================

let user = {
  name: "Rohit",
  age:20,
}

let { name, age } = user;
console.log(`name is ${name}`);




