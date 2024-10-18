const express = require("express");
const app = express();
const { getTopics } = require('./controllers/getTopics');
const { getEndpoints } = require('./controllers/getEndpoints');
const { getArticleById } = require('./controllers/getArticleById');
const { getArticles } = require('./controllers/getArticles');
const { getCommentsByArticleId } = require('./controllers/getCommentsByArticleId');
const { postComment } = require('./controllers/postComment');
const { patchArticle } = require('./controllers/patchArticle');
const {psqlInvalidIdErrorHandler, customErrorHandler, internalServerError, notNullViolation} = require('./error-handlers');


app.use(express.json());


app.get('/api', getEndpoints);

app.get('/api/topics', getTopics);

app.get('/api/articles/:article_id', getArticleById);

app.get('/api/articles', getArticles);

app.get('/api/articles/:article_id/comments', getCommentsByArticleId);


app.post('/api/articles/:article_id/comments', postComment);


app.patch('/api/articles/:article_id', patchArticle);



app.all('*', (req, res) => {
    res.status(404).send({msg: 'URL Not Found'});
})

app.use(psqlInvalidIdErrorHandler);
app.use(customErrorHandler);
app.use(internalServerError);
app.use(notNullViolation);


module.exports = app
