// function add(a,b){
//     return a+b;
// }
// let a=10;
// let b=10;

// let c=add(a,b);
// console.log(c);

// function avg(a,b){
//     return (a+b)/2;
// }

// let c1=avg(4,5);
// let c2=avg(7,8);

// console.log(c1, c2);




// let n=34;

// if(n>=8){
//     console.log("You are not a Kid: ");
// }
// else{
//     console.log("you are a kid: ");
// }

// let age=100;

// if(age>=18){
//     console.log("you can drive: ")
// }
// else if(age>=90 ){
//     console.log("you are too old")
// }
// else{
//     console.log("you can not drive")
// }


// function age(n){
//     if(n>=18){
//         console.log("you can drink: ")
//     }
//     else{
//         console.log("you can not drink: ")
//     }
// }

// age(13);


// let arr=[23,10,45,87,90,67,87];

// for(let i=0; i<arr.length; i++){
//     console.log(arr[i])
// }


// arr.forEach(function(ele){
//     console.log(ele)
// })

// let i=0;
// while(i<arr.length){
//     console.log(arr[i])
//     i++;
// }


for(let i=1; i<=20; i++){
    if(i==4 || i==5 ) continue;
    if(i==15) break;
    console.log(i);
}