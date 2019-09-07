const person = {
  name: "Caio",
  age: 24,
  hasHobbies: true,
  greet() {
    console.log('Hi, i am ' + this.name);
  }
};

person.greet();

