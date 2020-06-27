var express = require('express');
var router = express.Router();
const pool = require('../database/db');
var url = require('url');

router.post('/storeFormInfo', async(req, res) => {
    try {
        const postalCode = req.body.postalCode;
        const age = req.body.age;
        const nationality = req.body.nationality;
        const subsidyType = req.body.subsidyType;
        const values = [postalCode, age, nationality, subsidyType];
        const query = `INSERT INTO UserInfo(postalCode,age,nationality,subsidyType) VALUES ($1,$2,$3,$4)`;
        pool.query(query, values)
            .then(result => res.json("store info success"))
            .catch(e=> console.error(e.stack));
    } catch(err) {
        console.error("error occurred on storing user info");
    }
})

router.post('/submitUserFeedback', async(req, res) => {
    try {
        const rating = req.body.rating;
        const feedback = req.body.feedback;
        const values = [rating,feedback];
        const query = `INSERT INTO UserFeedback(rating, feedback) VALUES ($1,$2)`;
        pool.query(query, values)
            .then(result => res.json("store feedback success"))
            .catch(e => {console.error(e.stack)});
    } catch(err) {
        console.error("error occurred on storing user feedback");
    }
})

module.exports = router;