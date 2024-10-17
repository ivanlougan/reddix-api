const fetchArticles = require('../models/fetchArticles')

function getArticles(request, response, next) {
    const { sort_by = 'created_at', order = 'DESC' } = request.query;
    fetchArticles(sort_by, order).then((articles) => {
        response.status(200).send(articles);
    })
}

module.exports = { getArticles }