// for utility methods of the Notes-App
const fs = require('fs');

// add note
const addNote = (title, body) => {
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
		console.log(title + ' is added as a new note');
	}
};

// remove note
const rmNote = (title) => {
	let notesArr = loadNote();
	if (notesArr.length === 0) {
		console.log('sorry the note doesn exist');
		return;
	}
	// check if the note that has to be removed exists
	const isPresent = notesArr.some((curr) => {
		return curr.title == title;
	});
	if (isPresent == true) {
		notesArr = notesArr.filter((curr) => {
			if (curr.title != title) return curr;
		});
		console.log(title + ' deleted');
		saveNote(notesArr);
	} else {
		console.log('sorry the note doesn exist');
	}
};

// list note
const listNote = () => {
	console.log('your saved notes are :');
	const notesArr = loadNote();
	// refractor 1
	notesArr.forEach((currNote) => {
		console.log(currNote.title);
	});
};
const loadNote = () => {
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

const saveNote = (rawData) => {
	// this function will convert js object to json, to be saved in db.json
	const data = JSON.stringify(rawData);
	fs.writeFileSync('./db.json', data);
};

module.exports = {
	addNote: addNote,
	rmNote: rmNote,
	listNote: listNote
};
