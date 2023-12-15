const notes = require('express').Router();
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');

// GET route for retrieving notes
notes.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => {
        console.log(data);
        res.json(JSON.parse(data));
    })
});

// POST route for adding notes
notes.post('/', (req, res) => {
    console.info(`${req.method} request received to add a note`);
    console.log(req.body);

    const { isValid, title, text } = req.body

    const newNote = {
        title,
        text,
        id: uuidv4()
    }

    if (!isValid) {
        readAndAppend(newNote, './db/db.json')
        res.json('note is added');
    } else {
        res.json('error in adding note')
    }

});

module.exports = notes;