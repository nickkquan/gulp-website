class Person {
	constructor(name) {
		this.name = name;
	}
	hello() {
		if (typeof this.name === "string") {
			return "Hello " + this.name + "!";
		} else {
			return "Hello";
		}
	}
}

var person = new Person("Nick Quan");

document.write(person.hello());
