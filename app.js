const express = require("express");
const app = express();
const endpoints = require('./endpoints.json');
const { getTopics } = require('./controllers/getTopics');
const { getEndpoints } = require('./controllers/getEndpoints');
const { getArticleById } = require('./controllers/getArticleById');


app.get('/api', getEndpoints);

app.use(express.json());

app.get('/api/topics', getTopics);

app.get('/api/articles/:article_id', getArticleById);




app.all('*', (req, res) => {
    res.status(404).send({msg: 'URL Not Found'})
})


module.exports = app
