const express = require("express");
const app = express();
const endpoints = require('./endpoints.json');
const { getTopics } = require('./controllers/getTopics');
const { getEndpoints } = require('./controllers/getEndpoints');

app.use(express.json());

app.get('/api', getEndpoints);

app.get('/api/topics', getTopics);




app.all('*', (req, res) => {
    res.status(404).send({msg: 'URL Not Found'})
})


module.exports = app
