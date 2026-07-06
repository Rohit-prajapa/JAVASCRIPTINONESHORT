// // first javascript programm
// console.log("hello world");

// // 2. Variables
// let name="rohit";
// const n=67;
// var str="pune";

// console.log(name, n, str);

// // 3. Data Types
// let name1 = "rohit";  //String
// let age = 54; // number
// let a1=true; // boolen

// let und; // undefined
// let n1 = null; // null

// console.log(name1)
// console.log(age)
// console.log(a1)
// console.log(und)
// console.log(n1)

// // 4. Operators

// let a=45;
// let b=55;
// console.log("the addition of two nUmber is : ",a+b);
// console.log("the subtraction of two nUmber is : ",a-b);
// console.log("the multiplication of two nUmber is : ",a*b);
// console.log("the division of two nUmber is : ",a/b);
// console.log("the modulus  of two nUmber is : ",a%b);



// // 5. Comparison
// console.log(10=="10");
// console.log(10==='10');

// // (==)
// console.log(5 == "5");      // true
// console.log(true == 1);     // true
// console.log(false == 0);    // true
// console.log(null == undefined); // true

// //(===) 
// console.log(5 === "5");      // false
// console.log(5 === 5);        // true
// console.log(true === 1);     // false
// console.log(false === 0);    // false
// console.log(null === undefined); // false


// if Else

let age=45;

if(age>18){
    console.log("Adult");
}
else{
    console.log("not Adult");
}


let day=2;
 switch(day){
    case 1:
        console.log("monday");
        break;
        
    case 2:
        console.log("Tuesday");
        break;
    default:
        console.log("invalid day: ");
 }


//  print 1 to 10

for(let i=1; i<=10; i++){
    console.log(i,"\n");
}


for(let i=1; i<=10; i++){
    if(i%2==0){
        console.log(i);
    }
}