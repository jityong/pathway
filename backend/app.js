var express = require('express');
var path = require('path');
var app = express()
var cookieParser = require('cookie-parser');
var cors = require("cors");
const bodyParser = require('body-parser')

var googleMapRouter = require('./routes/googleMapApi');
var dbRouter = require('./routes/dbStorage');


// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
const port = process.env.PORT || 5000;
app.listen(port);
app.use(cookieParser());
const whitelist = ['https://www.pathwaynuhs.com','http://www.pathwaynuhs.com']
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}
app.use(cors(corsOptions))
// app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/googleMap', googleMapRouter);
app.use('/dbStorage', dbRouter);


console.log('App is listening on port ' + port);
module.exports = app;