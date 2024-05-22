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
    } else {
        response.sendStatus(400);
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
            });
        } else {
            response.sendStatus(400);
        }
    } else {
        response.sendStatus(400);
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
        } else {
            response.sendStatus(404);
        }
    } else {
        response.sendStatus(400);
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
                });
            } else {
                response.sendStatus(404);
            }
        } else {
            response.sendStatus(400);
        }
    } else {
        response.sendStatus(400);
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
            });
        } else {
            response.sendStatus(404);
        }
    } else {
        response.sendStatus(400);
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});