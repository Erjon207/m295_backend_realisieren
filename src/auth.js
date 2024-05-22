const express = require('express');
const router = express.Router();

router.use(express.json());

router.post('/login', (request, response) => {
    if (request.body.password == "m295" && request.body.email != null && request.body.email != "") {
        request.session.email = request.body.email;
        request.session.authentificated = true;
        response.status(200).send(request.session);
    } else {
        response.sendStatus(401);
        console.log("Error: Falsche Login Daten")
    }
});

router.get('/verify', (request, response) => {
    if (request.session.authentificated == true){
        response.send(request.session);
    } else {
        response.sendStatus(401);
        console.log("Error: Zugriff verweigert auf einen nicht authentifizierter Benutzer");
    }
});

router.delete('/logout', (request, response) => {
    if (request.session.authentificated === true) {
        request.session.authentificated = false;
        response.sendStatus(200);
    } else {
        response.sendStatus(401);
        console.log("Error: Zugriff verweigert auf einen nicht authentifizierter Benutzer");
    }
});

module.exports = router;