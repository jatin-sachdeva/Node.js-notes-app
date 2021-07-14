const yargs = require('yargs');

// creating commands using yargs

// yargs.command(
// 	[ 'add [title]', 'a' ],
// 	'add note',
// 	(yargs) => {
// 		yargs.positional('title', {
// 			describe: 'title of the note to be added',
// 			type: 'string',
// 			default: 'new note'
// 		});
// 	},
// 	(argv) => {
// 		console.log('adding ' + argv.title);
// 	}
// );

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
	handler: (argv) => {
		console.log(argv.title + ' is added and the body is ' + argv.body);
	}
});
yargs.parse();
