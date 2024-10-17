const express = require("express");
const app = express();
const endpoints = require('./endpoints.json');
const { getTopics } = require('./controllers/getTopics');
const { getEndpoints } = require('./controllers/getEndpoints');
const { getArticleById } = require('./controllers/getArticleById');
const { getArticles } = require('./controllers/getArticles')
const { getCommentsByArticleId } = require('./controllers/getCommentsByArticleId')
const {psqlInvalidIdErrorHandler, customErrorHandler, internalServerError} = require('./error-handlers')

app.use(express.json());


app.get('/api', getEndpoints);

app.get('/api/topics', getTopics);

app.get('/api/articles/:article_id', getArticleById);

app.get('/api/articles', getArticles);

app.get('/api/articles/:article_id/comments', getCommentsByArticleId);




app.all('*', (req, res) => {
    res.status(404).send({msg: 'URL Not Found'})
})

app.use(psqlInvalidIdErrorHandler);
app.use(customErrorHandler);
app.use(internalServerError);


module.exports = app
