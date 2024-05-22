const express = require('express');
const router = express.Router();

router.use(express.json());

router.post('/login', (request, response) => {
    if (request.body.password == "m295") {
        request.session.email = request.body.email;
        request.session.authetificated = true;
        console.log(request.session)
        response.status(200).send(request.session);
    } else {
        response.status(401).send('Invalid credentials.');
    }
});

router.get('/verify', (request, response) => {
    if (request.session.authetificated == true){
        response.send(request.session);
    } else {
        response.sendStatus(400);
    }
});

router.delete('/delete', (request, response) => {
    if (request.session.authetificated == true) {
        request.session.authetificated = null;
        response.status(400);
    } 
});

module.exports = router;