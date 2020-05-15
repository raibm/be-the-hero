const express = require('express');
const ongController = require('./controllers/OngController');
const incidentController = require('./controllers/IncidentController');
const profileController = require('./controllers/ProfileController');
const sessionController = require('./controllers/SessionController');

const routes = express();

routes.get('/profile', profileController.index);

routes.post('/session', sessionController.create);

routes.post('/ongs', ongController.create);
routes.get('/ongs', ongController.index);

routes.post('/incidents', incidentController.create);
routes.get('/incidents', incidentController.index);
routes.delete('/incidents/:id', incidentController.delete);


module.exports = routes