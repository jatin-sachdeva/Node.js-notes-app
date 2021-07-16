// for utility methods of the Notes-App
const fs = require('fs');
const addNote = function(title, body) {
	const notesArr = loadNote();

	// adding a check if the title of the note already exists
	const isDuplicate = notesArr.some((curr) => {
		return curr.title == title;
	});
	if (isDuplicate) console.log('note with similar title exists');
	else {
		notesArr.push({
			title: title,
			body: body
		});
		saveNote(notesArr);
	}
};

const loadNote = function() {
	// get the .json format and return js object

	// using try block to try if the db.json has a [] of notes
	try {
		const rawJsonData = fs.readFileSync('./db.json').toString();
		const data = JSON.parse(rawJsonData);
		return data;
	} catch (err) {
		console.log(err);
		// as no array of notes exist it will return new empty array
		return [];
	}
};

const saveNote = function(rawData) {
	// this function will convert js object to json, to be saved in db.json
	const data = JSON.stringify(rawData);
	fs.writeFileSync('./db.json', data);
};

module.exports = {
	addNote: addNote
};
