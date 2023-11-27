const notes = require('express').Router();
const uuid = require('../helpers/uuid');
const {readFile, appendFile} = require('../helpers/fs');

notes.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFile('./db/db.json')
    .then((data) => res.json(JSON.parse(data)));
})

notes.post('/', (req, res) => {
    console.info(`${req.method} recieved to add a new note`);

    const { title, text } = req.body;

    if(req.body) {
        const newNote = {
        title,
        text,
        id: uuid()
        };

        console.log("newNote: ", newNote);

    appendFile(newNote, './db/db.json');
    res.json('Note added');
} else {
    res.error('An error has occured');
}
});

module.exports = notes;