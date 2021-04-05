const prompt = require('prompt-sync')();
const fs = require('fs');
const studentsData = require('./data.json');

class Employee {
	logging() {
		fs.readFile('data.json', function (err, data) {
			console.log(data.toString());
		});
	}
}

module.exports = { Employee };

const firstName = prompt('What is your first name?');
const lastName = prompt('What is your last name?');
const age = prompt('What is your age?');
const gender = prompt('What is your gender?');

let user = {
	firstName,
	lastName,
	age,
	gender,
	timeStamp: Date.now(),
};
studentsData.push(user);

fs.writeFile('data.json', JSON.stringify(studentsData), (err) => {
	// Checking for errors
	if (err) throw err;

	console.log('Done writing'); // Success
});
