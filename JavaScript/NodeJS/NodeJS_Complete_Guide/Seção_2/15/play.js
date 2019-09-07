const person = {
  name: "Caio",
  age: 24,
  hasHobbies: true,
  greet() {
    console.log('Hi, i am ' + this.name);
  }
};

const hobbies = ['Sports', 'Cooking'];

for(let hooby of hobbies) {
  console.log(hooby);
}

console.log('Array Map => ', hobbies.map(hobby => {
  return 'Hobby: ' + hobby;
}));

console.log('Array => ', hobbies);

