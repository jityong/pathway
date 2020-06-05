var express = require('express');
var router = express.Router();
var url = require('url');
var fetch = require("node-fetch")
require('dotenv').config();
const API_KEY = process.env.API_KEY;

router.post('/getGeoLoc', async (req, res) => {
    const postalCode = req.body.postalCode;
    // console.log(postalCode);
    // console.log('API KEY:',API_KEY)
    fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=
        ${postalCode}
            &components=country:sg&key=${API_KEY}`
    ).then(result => result.json())
        .then(json => res.json(json))

})
module.exports = router;