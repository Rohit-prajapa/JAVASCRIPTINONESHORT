// // // console.log("hello world");
// // // document.write("this is document write");
// // // console.warn("this is warning");
// // // console.error("this is error");


// // // var num1=56;
// // // var num2=34;
// // // console.log(num1+num2); 


// // //4. Data type in javascript
// // // number data type
// // var num1=455;
// // var num2=89.45;

// // console.log(num1+num2);

// // // String data type
// // var str1="this is String 1";
// // var str2='this is String 2';

// // console.log(str1);
// // console.log(str2);

// // // object data type
// // var marks={
// //     rohit:98,
// //     rahul:56.90,
// //     kishan:67
// // }

// // console.log(marks);


// // // boolean

// // var a=true;
// // var b=false;

// // console.log(a,b);


// // // undefined
// // var und;
// // console.log(und);


// // var n=null;
// // console.log(n);

// // // Arrays

// // var arr=[1,2,3,4,5];
// // console.log(arr);
// // console.log(arr[0])  



// // DOM  MANIPULATION

// // let ele=document.getElementById('click');
// // console.log(ele);

// // let eleclass=document.getElementsByClassName('container');
// // console.log(eleclass); 

// // console.log(ele.innerHTML);
// // console.log(ele.innerText); 


// // let tn=document.getElementsByTagName('button');
// // console.log(tn);  
// // createdElement=document.createElement('p');
// // createdElement.innerText="this is a paragraph";
// // tn[0].append(createdElement);

// // sel =document.querySelector('container');
// // console.log(sel);
// // sel2 =document.querySelectorAll('container');
// // console.log(sel2);


// // Event in javascript

// function clicked(){
//     console.log("the button is clicked");
// }

// window.onload=function(){
//     console.log("the button is load");
// }


// firstcontainer.addEventListener('click',function(){
//     console.log("click hua");
// });

// document.addEventListener("keydown", (event) => {
//     console.log(event.key);
// });

// Arrow Function
// function sum(a,b){
//     return a+b;
// }

// sum=(a,b)=>{
//     return a+b;
// }

// //  settime out and setInterval
// logKaro=()=>{
//     console.log("i am your log");
// }

// // setTimeout(logKaro,2000);
// setInterval(logKaro,2000);


// javascript localStorage
//  localStorage.getItem('name', 'rohit');
//  localStorage.getItem('name');

//  JSON

obj={
    name: "rohit",
    marks: 89
}
jso=JSON.stringify(obj);

console.log(jso);




