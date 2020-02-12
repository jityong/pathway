const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fetch = require("node-fetch");

require("dotenv").config();

const api_key = process.env.API_KEY;
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API calls
app.get('/getCoord/:postalcode', async (req, res) => {
    const postalcode = req.params.postalcode;
    console.log(req.params);
    const coord_url = `https://maps.googleapis.com/maps/api/geocode/json?address=${postalcode}
    &components=country:sg&key=${api_key}`;
    const coord_res = await fetch (coord_url);
    const coord_data = await coord_res.json();
    console.log(coord_data);
    res.json(coord_data);
    // res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
    console.log(req.body);
    res.send(
        `I received your POST request. This is what you sent me: ${req.body.post}`,
    );
});

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));

    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.listen(port, () => console.log(`Listening on port ${port}`));