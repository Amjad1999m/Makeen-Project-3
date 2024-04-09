// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
app.use(cors());


/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Initialize the main project folder
app.use(express.static('website'));

// POST route
app.post('/add', addInfo);

function addInfo(req, res) {
    projectData['temp'] = req.body.temp;
    projectData['date'] = req.body.date;
    projectData['content'] = req.body.content;
    res.send(projectData);
}

function getInfo(req, res) {
    res.send(projectData);
};
// Initialize all route with a callback function
app.get('/all', getInfo);

// Server set up 
const port = 3005;
const server = app.listen(port, () => {
    console.log(`server running on http://localhost:${port}`); // Callback to debug
});