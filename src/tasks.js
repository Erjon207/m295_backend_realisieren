const express = require('express');
const app = express();
const port = 3000;

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
    response.send(tasks);
});

app.post('/tasks', (request, response) => {
    request.body.id = i;
    i++
    tasks.push(request.body);
    response.send(request.body);
});

app.get('/tasks/:id', (request, response) => {
    if (tasks.findIndex((task) => task.id == request.params.id)) {
        response.send(tasks[tasks.findIndex((task) => task.id == request.params.id)])
    } else {
        response.sendStatus(404);
    }
});

app.put('/tasks/:id', (request, response) => {
    if (tasks.findIndex((task) => task.id == request.params.id)) {
        tasks[tasks.findIndex((task) => task.id == request.params.id)] = request.body;
        response.send(tasks[tasks.findIndex((task) => task.id == request.params.id)])
    } else {
        response.sendStatus(404);
    }
});

app.delete('/tasks/:id', (request, response) => {
    if (tasks.findIndex((task) => task.id == request.params.id)) {
        tasks[tasks.findIndex((task) => task.id == request.params.id)].doneAt = currentdate.getHours() + ":" + currentdate.getMinutes();
        response.send(tasks[tasks.findIndex((task) => task.id == request.params.id)])
    } else {
        response.sendStatus(404);
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});