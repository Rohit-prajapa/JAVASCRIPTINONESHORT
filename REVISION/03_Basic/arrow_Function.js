// const user = {
//   username: "Rohit",
//   price:999,

//   welcomeMessage: function () {
//     console.log(`${this.username} welcome to website`);
//     console.log(this);

//   }
// }

// console.log(user);
// console.log(user.username);

// user.welcomeMessage()
// user.username = "Prajapati"
// user.welcomeMessage()

// console.log(this);

// function one() {
//   console.log(this);

// }

// one()


// function one() {
//   let username="Rohit"
//   console.log(this.username);

// }

// one()

// const chai = function chai() {
//   let username="Rohit"
//   console.log(this.username);
//   // console.log("Hello Rohit");
// }
// chai()



// const chai1 = ()=> {
//   console.log(this);
// }

// chai1()


// const addTwo = (num1,num2) => {
//   return num1+num2
// }
// console.log(addTwo(2,3));



(function chai() {
  console.log("DB Connected");
})();

((name)=>{
  console.log(`Db Connected tooooo ${name}`);
})('Rohit')


