const fetchArticleById = require('../models/fetchArticleById');

function getArticleById (request, response) {
    const { article_id } = request.params;
    fetchArticleById(article_id).then((article) => {
        response.status(200).send(article);
    })
}

module.exports = { getArticleById };