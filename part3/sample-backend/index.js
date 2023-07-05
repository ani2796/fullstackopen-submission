require('dotenv').config()

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
    Note.findById(request.params.id).then(note => {
        response.json(note);
    }).catch(error => {
        console.log("error: ", error.message);
    });
})

const generateId = () => {
    const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0 ;
    return (maxId + 1);
}

app.delete('/api/notes/:id', (request, response) => {
    // console.log("reached /api/notes", id);
    console.log("id to be deleted: ", request.params.id);
    Note.findByIdAndDelete(request.params.id).then(deletedNote => {
        console.log("deleted note: ", deletedNote);
        response.status(204).end();
    }).catch(error => {
        console.log("error while deleting note: ", error.message);
        response.status(500).end();
    });
})

app.put('/api/notes/:id', (request, response) => {

    // console.log("Put request.body: ", request.body);   
    Note.findByIdAndUpdate(request.params.id, request.body)
    .then(note => {
        console.log("Update successful, returned object: ", note);
            response.json(note);
        })
        .catch(error => {
            console.log("Update error: ", error.message);
            response.status(404).end();
        })
    
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

    // console.log("body important: ", body.important);
    // console.log("body.important || false: ", (body.important || false))
    const note = new Note({
        content: body.content,  
        important: (body.important || false),
        id: generateId(),
    });
    
    note.save().then(savedNote => {
        response.json(savedNote);
    }).catch(error => {
        console.log("Save note error: ", error.message);
    });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});