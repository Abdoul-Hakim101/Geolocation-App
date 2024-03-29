const express = require('express');
const {request, response} = require("express");

const Datastore = require('nedb');

const app = express();
app.listen(3000, () => console.log('Listening at 3000'));
app.use(express.static('public'));

app.use(express.json({limit: '1mb'}));

const database = new Datastore('database.db');
database.loadDatabase();

app.get('/api', (request, response) => {
    database.find({}, (err, data) => {
        if (err) {
            return;
        }
        response.json(data);
    })
})
app.post('/api', (request, response) => {
    const data = request.body;
    data.timestamp = Date.now();
    database.insert(data);
    response.json({
        status: 'success',
        latitude: request.body.latitude,
        longitude: request.body.longitude
    })
});