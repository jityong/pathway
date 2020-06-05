var express = require('express');
var path = require('path');
var app = express()
var cookieParser = require('cookie-parser');
var cors = require("cors");
const bodyParser = require('body-parser')

var googleMapRouter = require('./routes/googleMapApi');


// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
const port = process.env.PORT || 5000;
app.listen(port);
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/googleMap', googleMapRouter);


console.log('App is listening on port ' + port);
module.exports = app;