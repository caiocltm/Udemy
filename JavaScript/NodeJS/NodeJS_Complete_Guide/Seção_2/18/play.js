const person = {
	name: "Caio",
	age: 24,
	hasHobbies: true,
	greet() {
		console.log("Hi, i am " + this.name);
	}
};

const hobbies = ["Sports", "Cooking"];

for (let hooby of hobbies) {
	console.log(hooby);
}

console.log(
	"Array Map => ",
	hobbies.map(hobby => {
		return "Hobby: " + hobby;
	})
);

console.log("Array => ", hobbies);

hobbies.push("Programming");

console.log("Array => ", hobbies);

const sliceCopiedArray = hobbies.slice();
console.log("Slice Copied Array => ", sliceCopiedArray);

const copiedArray = [hobbies];
console.log("Copied Array => ", copiedArray);

const spreadCopiedArray = [...hobbies];
console.log("Spread Copied Array => ", spreadCopiedArray);

const copiedPerson = { ...person };
console.log("Spread Copied Person => ", copiedPerson);

const toArray = (...args) => {
	return args;
};

console.log("To Array => ", toArray(1, 2, 3, 5, 6));

const printName = ({ name, age }) => {
	console.log('Name ' + name + ' and Age ' + age);
};

printName(person);


const {age, name} = person;
const [h1, h2] = hobbies;

console.log('Name ' + name + ' and Age ' + age);
console.log('Hobby 1 ' + h1 + ' and Hobby 2 ' + h2);