class User{
  constructor(username, emails, password) {
    this.username = username
    this.emails = emails
    this.password=password
  }

  encryptPassword() {
    return `${this.password}`
  }
}

const chai = new User('Rohit', 'rahulprajapati69424@gmail.com', 'rk@221207')
// console.log(chai);
console.log(chai.encryptPassword());


