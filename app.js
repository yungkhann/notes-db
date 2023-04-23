const notes = require('./notes.js');

const yargs = require('yargs');
yargs.version('1.1.0');
yargs.command({
  command: 'add',
  describe: 'add a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    notes.addNote(argv.title, argv.body);
  },
});
yargs.command({
  command: 'remove',
  describe: 'remove a note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    notes.removeNote(argv.title);
  },
});
yargs.command({
  command: 'list',
  describe: 'list your notes',
  handler() {
    notes.getNotes();
  },
});
yargs.command({
  command: 'filter',
  describe: 'filter your notes',
  handler(argv) {
    notes.filterNotes(argv.title);
  },
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
});
yargs.command({
  command: 'read',
  describe: 'read a note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    notes.getOneNote(argv.title);
  },
});

yargs.parse();
