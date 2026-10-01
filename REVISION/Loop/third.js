// const coding = ['js', 'java','python','c','cpp']

// coding.forEach((item) => {
//   console.log(item);

// })

//filter
// const num = [1, 2, 3, 4, 5, 6, 7, 8, 9]
// let newNum = num.filter((num) => num > 4)
// console.log(newNum);




// map

// const num=[1,2,3,4,5,6,7,8,9];
// const mynum = num.map((n) => n + 10)
// console.log(mynum);


//map
// const myNum = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// const n = myNum
//               .map((num) => num * 10)
//               .map((num)=>num+2)
// console.log(n);





//Reduce

const num = [1, 2, 3, 4]
const total = num.reduce(function (acc, curr) {
  console.log(`${acc}  ${curr}`);
  
  return acc + curr;
}, 0)

console.log(total);


