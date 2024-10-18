const express = require("express");
const app = express();
const { getUsers } = require('./controllers/getUsers');
const { getTopics } = require('./controllers/getTopics');
const { getEndpoints } = require('./controllers/getEndpoints');
const { getArticles } = require('./controllers/getArticles');
const { getArticleById } = require('./controllers/getArticleById');
const { getCommentsByArticleId } = require('./controllers/getCommentsByArticleId');
const { postComment } = require('./controllers/postComment');
const { patchArticle } = require('./controllers/patchArticle');
const { deleteCommentById } = require('./controllers/deleteCommentById');
const {psqlInvalidIdErrorHandler, customErrorHandler, internalServerError, notNullViolation} = require('./error-handlers');


app.use(express.json());


app.get('/api', getEndpoints);

app.get('/api/topics', getTopics);

app.get('/api/articles/:article_id', getArticleById);

app.get('/api/articles', getArticles);

app.get('/api/articles/:article_id/comments', getCommentsByArticleId);

app.get('/api/users', getUsers);


app.post('/api/articles/:article_id/comments', postComment);


app.patch('/api/articles/:article_id', patchArticle);


app.delete('/api/comments/:comment_id', deleteCommentById);



app.all('*', (req, res) => {
    res.status(404).send({msg: 'URL Not Found'});
})

app.use(psqlInvalidIdErrorHandler);
app.use(customErrorHandler);
app.use(internalServerError);
app.use(notNullViolation);


module.exports = app
