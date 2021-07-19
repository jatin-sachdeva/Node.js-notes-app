const yargs = require('yargs');
const fs = require('fs');
const utils = require('./notes');
const { type } = require('os');
const { rmNote, listNote } = require('./notes');
// creating commands using yargs
// https://github.com/yargs/yargs/blob/master/docs/advanced.md
/*
Method 1 for creating yargs command:
yargs.command(
	[ 'add [title]', 'a' ],
	'add note',
	(yargs) => {
		yargs.positional('title', {
			describe: 'title of the note to be added',
			type: 'string',
			default: 'new note'
		});
	},
	(argv) => {
		console.log('adding ' + argv.title);
	}
);*/

// Method 2:
// add note
yargs.command({
	command: 'add <title> <body>',
	desc: 'add a new note',
	aliases: [ 'a' ],
	builder: (yargs) => {
		yargs
			.positional('title', {
				describe: 'title of the note to be added',
				type: 'string',
				default: 'new note'
			})
			.positional('body', {
				describe: 'body of the note',
				type: 'string'
			});
	},
	handler(argv) {
		utils.addNote(argv.title, argv.body);
	}
});

// remove note
yargs.command({
	command: 'rm <title>',
	description: '<title> of note to be removed',
	builder: (yargs) => {
		yargs.positional('title', {
			describe: 'title of the note to be removed',
			type: 'string'
		});
	},
	handler(argv) {
		rmNote(argv.title);
	}
});

// list notes
yargs.command({
	command: 'ls',
	description: 'list all the notes',
	builder(yargs) {},
	handler(argv) {
		listNote();
	}
});
yargs.parse();
