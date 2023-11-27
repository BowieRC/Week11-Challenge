const notes = require('express').Router();
const { response } = require('.');
const {readFromFile, readAndAppend} = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

notes.get('/', (req, res) => {
    
    readFromFile('./db/db.json')
        .then((data) => {
            res.json(JSON.parse(data))
        });
});

notes.post('/', (req, res) => {
    const { title, text} = req.body;
    const newNote = {
        title,
        text,
        id: uuid()
    };

    readAndAppend(newNote, './db/db.json');
});

module.exports = notes;