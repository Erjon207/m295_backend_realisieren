const express = require('express');
const app = express();
const port = 3000;

const session = require("express-session");
const authRoutes = require('./auth');

app.use(session({
    secret: 'supersecret',
    resave: false,
    saveUninitialized: false,
    cookie: {}
}));

app.use('/auth', authRoutes);

app.use(express.json());

let tasks = [
    {
        "id": 1,
        "title": "Einkäufe",
        "description": "2 Liter Wasser, 6 Eier und 1 Brot",
        "doneAt": "16:45",
        "creator": "mami@family.ch"
    },
    {
        "id": 2,
        "title": "Hausarbeit",
        "description": "Staubsaugen",
        "doneAt": null,
        "creator": "mami@family.ch"
    }
]

let i = tasks.length + 1;
let currentdate = new Date();

app.get('/tasks', (request, response) => {
    if (request.session.authetificated == true) {
        let session = request.session
        response.json({
            tasks,
            session
        });
        console.log("Alle Tasks werden angezeigt.")
    } else {
        response.sendStatus(401);
        console.log("Error: Zugriff verweigert auf einen nicht authentifizierter Benutzer.");
    }
});

app.post('/tasks', (request, response) => {
    if (request.session.authetificated == true) {
        if (request.body.title != null && request.body.title != "" && request.body.description != null && request.body.description != "") {
            request.body.id = i;
            i++
            tasks.push(request.body);
            let body = request.body
            let session = request.session
            response.json({
                body,
                session
            }).status(201);
            console.log("Die Task wurde erfolgreich hinzugefügt.")
        } else {
            response.sendStatus(400);
            console.log("Error: Unvollständige Task.")
        }
    } else {
        response.sendStatus(401);
        console.log("Error: Zugriff verweigert auf einen nicht authentifizierter Benutzer.");
    }
});

app.get('/tasks/:id', (request, response) => {
    if (request.session.authetificated == true) {
        if (tasks.findIndex((task) => task.id == request.params.id)) {
            let body = tasks[tasks.findIndex((task) => task.id == request.params.id)]
            let session = request.session
            response.json({
                body,
                session
            });
            console.log("Die Task mit der id: " + request.params.id + " wurde erfolgreich abgeschickt.")
        } else {
            response.sendStatus(404);
            console.log("Error: Task existiert nicht.")
        }
    } else {
        response.sendStatus(401);
        console.log("Error: Zugriff verweigert auf einen nicht authentifizierter Benutzer.");
    }
});

app.put('/tasks/:id', (request, response) => {
    if (request.session.authetificated == true) {
        if (request.body.title != null && request.body.title != "" && request.body.description != null && request.body.description != "") {
            if (tasks.findIndex((task) => task.id == request.params.id)) {
                tasks[tasks.findIndex((task) => task.id == request.params.id)] = request.body;
                let body = tasks[tasks.findIndex((task) => task.id == request.params.id)]
                let session = request.session
                response.json({
                    body,
                    session
                }).status(202);
                console.log("Die Task mit der Id:" + request.params.id + " wurde erfolgreich bearbeitet.")
            } else {
                response.sendStatus(404);
                console.log("Error: Task existiert nicht.")
            }
        } else {
            response.sendStatus(400);
            console.log("Error: Unvollständige Task.")
        }
    } else {
        response.sendStatus(401);
        console.log("Error: Zugriff verweigert auf einen nicht authentifizierter Benutzer.");
    }
});

app.delete('/tasks/:id', (request, response) => {
    if (request.session.authetificated == true) {
        if (tasks.findIndex((task) => task.id == request.params.id)) {
            tasks[tasks.findIndex((task) => task.id == request.params.id)].doneAt = currentdate.getHours() + ":" + currentdate.getMinutes();
            let body = tasks[tasks.findIndex((task) => task.id == request.params.id)]
            let session = request.session
            response.json({
                body,
                session
            }).status(200);
            console.log("Die Task mit der Id:" + request.params.id + " wurde erfolgreicht beendet.")
        } else {
            response.sendStatus(404);
            console.log("Error: Task existiert nicht.")
        }
    } else {
        response.sendStatus(401);
        console.log("Error: Zugriff verweigert auf einen nicht authentifizierter Benutzer.");
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});