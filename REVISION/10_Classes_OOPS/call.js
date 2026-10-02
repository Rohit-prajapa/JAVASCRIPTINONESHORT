function SetUsername(username) {
  this.username = username;
}

function createUserName(username, emails, password) {
  SetUsername.call(this,username)
  this.emails = emails
  this.password=password
}


const chai = new createUserName('Rohit', 'rahulprajapati69424@gmail.com', 'rk@221207')
console.log(chai);



