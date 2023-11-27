const express = require('express');
const path = require('path');

const api = require('./routes/index');
const notes = require('./db/db.json');
const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));

app.use('/api', api);

app.get('/', (req, res) =>{
    res.sendFile([path.join(__dirname, '/public/index.html')]);
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
})

app.get('/api/id/:note_id', (req, res) => {
    if(req.params.note_id) {
        console.info(`${req.method} request for ${req.params.note_id}`);
        const requestId = req.params.note_id;
        for(let i = 0; i < notes.length; i++) {
            const currentNote = notes[i];
            if(currentNote.id === requestId){
                res.status(200).json(currentNote);
                return;
            }
        }
        res.status(404).send("No note found");
    } else {
        res.status(400).send('No note ID provided')
    }
})

app.get('/*', (req, res) =>{
    res.sendFile(path.join(__dirname, '/public/index.html'));
})



app.listen(PORT, () => {
    console.log(`App running @ http://localhost:${PORT}`);
})