const express = require('express');
const router = express.Router();

router.use(express.json());

router.post('/login', (request, response) => {
    if (request.body.password == "m295" && request.body.email != null && request.body.email != "") {
        request.session.email = request.body.email;
        request.session.authetificated = true;
        response.status(200).send(request.session);
    } else {
        response.sendStatus(401);
        console.log("Error: Falsche Login Daten")
    }
});

router.get('/verify', (request, response) => {
    if (request.session.authetificated == true){
        response.send(request.session);
    } else {
        response.sendStatus(401);
        console.log("Error: Zugriff verweigert auf einen nicht authentifizierter Benutzer");
    }
});

router.delete('/delete', (request, response) => {
    if (request.session.authetificated == true) {
        request.session.authetificated = null;
        response.status(200);
    } else {
        response.sendStatus(401);
        console.log("Error: Zugriff verweigert auf einen nicht authentifizierter Benutzer");
    }
});

module.exports = router;