// For of

// let arr = [1, 2, 3, 4, 5]
// for (const i of arr) {
//   console.log(i);
// }


// let arr = ["Rohit", 1, 2, true, 5]

// for (const i of arr) {
//   console.log(i);

// }

// const greeting = "Hello Rohit ";
// for (const greet of greeting) {
//   console.log(greet);
// }


// const map = new Map();
// map.set('IN','India')
// map.set('Usa',"united state of america")
// map.set("fr",'Franch')
// map.set('a',1)
// map.set('b',2)
// console.log(map);

// for (const ele of map) {
//   console.log(ele);
// }

// for (const [key, value] of map) {
//   console.log(key,value);
// }




// const myobj = {
//   js: "javascript",
//   CPP: "c++",
//   rb: "Ruby",
//   swift:"swift by apple"
// }

// for (const key in myobj) {
//   console.log(myobj[key]);
// }


// const arr = ['js', 'cpp', 'c', 'java', 'python']
// for (const key in arr) {
//   console.log(arr[key]);
// }


const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
// arr.forEach(function (val) {
//   console.log(val);

// })

arr.forEach((item,index,arr) => {
console.log(item,index,arr);
})


const mycoding = [
  {
    language: "Javascript",
    filename: "js",
  },
  {
    language: "Java",
    filename: "java",
  },
  {
    language: "Python",
    filename: "Py",
  },
];

mycoding.forEach((item) => {
  // console.log(item);
  console.log(item.filename);
  console.log(item.language);


})
