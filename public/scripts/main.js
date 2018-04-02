class Person {
	constructor(name) {
		this.name = name;
	}
	hello() {
		if (typeof this.name === "string") {
			return "Hello, " + this.name + "!";
		} else {
			return "Hello";
		}
	}
}

var person = new Person("Nick");
var greetHTML = templates["greeting"]({
	message: person.hello()
});
document.write(greetHTML);
