const express = require('express')
const cors = require('cors');
const Note = require('./models/note');

const app = express()

app.use(cors())
app.use(express.json())

let notes = [  
    {    
        id: 1,    
        content: "HTML is easy",    
        important: true  
    },  
    {    
        id: 2,    
        content: "Browser can execute only JavaScript",    
        important: false 
     },  
    {    
        id: 3,    
        content: "GET and POST are the most important methods of HTTP protocol",    
        important: true  
    }
]

app.get('/', (request, response) => {
    response.send("<h1>Hello, world</h1>");
})

app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes);
    })
  })

app.get('/api/notes/:id', (request, response) => {
const id = Number(request.params.id);
console.log("id type", typeof id);
const note = notes.find(note => note.id === id);

if(note) {
    response.json(note);
} else {
    response.status(404).end();
}
})

const generateId = () => {
    const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0 ;
    return (maxId + 1);
}

app.delete('/api/notes/:id', (request, response) => {
    console.log("reached /api/notes", id);
    
    const id = Number(request.params.id);
    notes = notes.filter(note => note.id !== id);

    response.status(204).end();
})

app.put('/api/notes/:id', (request, response) => {
    const body = request.body;
    const id = Number(request.params.id);
    const noteToUpdate = notes.find(n => n.id === id);

    console.log("Note to update: ", noteToUpdate);
    if(!noteToUpdate) {
        response.status(404).json({
            error: "Note not found in the server",
        });
        return;
    }

    const newNote = {
        id: noteToUpdate.id,
        content: body.content,
        important: body.important,
    }

    console.log("new note: ", newNote);
    notes = notes.map(n => (n.id === id) ? newNote : n);
    response.json(newNote);
})

app.post('/api/notes', (request, response) => {  

    console.log("Posting to /api/notes");
    console.log("Notes: ", notes);

    const body = request.body;

    if(!body.content) {
        response.status(400).json({
            error: 'content missin'
        });
        return;
    }

    console.log("body important: ", body.important);
    console.log("body.important || false: ", (body.important || false))
    const note = {
        content: body.content,  
        important: (body.important || false),
        id: generateId(),
    };

    notes = notes.concat(note);
    
    console.log("New notes: ", notes);
    response.json(note);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});