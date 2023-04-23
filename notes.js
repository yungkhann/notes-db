const fs = require('fs');
const chalk = require('chalk');
const getNotes = function () {
  const notes = loadNotes();
  console.log(chalk.inverse('Your notes:'));
  notes.forEach(note => {
    console.log(note.title + '\n' + note.body + '\n');
  });
};

const getOneNote = title => {
  const notes = loadNotes();
  const resNoteID = notes.findIndex(note => note.title === title);
  const resNote = notes[resNoteID];
  if (resNote) {
    console.log(chalk.inverse('Note found:', title));
    console.log(resNote.title + '\n' + resNote.body + '\n');
  } else {
    console.log(chalk.red.inverse('Not was not found'));
  }
};

const filterNotes = word => {
  const notes = loadNotes();
  const filteredNotes = notes.filter(note => {
    const titleLower = note.title.toLowerCase();
    return titleLower.startsWith(word);
  });
  filteredNotes.forEach(note => {
    console.log(note.title + '\n' + note.body + '\n');
  });
};

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.filter(note => note.title === title);
  if (!duplicateNote) {
    notes.push({ title: title, body: body });
    saveNotes(notes);
    console.log(
      chalk.bgGreen(`New Note added \t title: ${title} \t  body:${body}`)
    );
  } else {
    console.log(chalk.bgRed('The title is already in use'));
  }
};

const removeNote = title => {
  const notes = loadNotes();
  const updatedNotes = notes.filter(note => note.title !== title);

  if (notes.length > updatedNotes.length) {
    console.log(chalk.bgGreen(`Note removed title:${title}`));
    saveNotes(updatedNotes);
  } else {
    console.log(chalk.bgRed('No note found'));
  }
};

const saveNotes = notes => {
  const data = JSON.stringify(notes);
  fs.writeFileSync('notes.json', data);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    return [];
  }
};

module.exports = {
  getNotes: getNotes,
  getOneNote: getOneNote,
  addNote: addNote,
  removeNote: removeNote,
  filterNotes: filterNotes,
};
