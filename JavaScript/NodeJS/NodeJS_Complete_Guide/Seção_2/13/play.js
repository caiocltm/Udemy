const name = "Caio";
let age = 24;
const hasHobbies = true;

const summarizeUser = (userName, userAge, userHasHobby) => {
  return (
    "Name is " +
    userName +
    " age is " +
    userAge +
    " and the user has hobbies: " +
    userHasHobby
  );
};

const add = (a, b) => a + b;

const addOne = a => a + 1;

console.log("Add: ", add(4, 6));

console.log("AddOne: ", addOne(6));

console.log(summarizeUser(name, age, hasHobbies));
