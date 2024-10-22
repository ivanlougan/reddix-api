const fetchArticles = require('../models/fetchArticles')

function getArticles(request, response, next) {
    const { sort_by = "created_at", order = "DESC", topic } = request.query;
    fetchArticles(sort_by, order, topic)
      .then((articles) => {
        response.status(200).send({ articles });
      })
      .catch((err) => {
        next(err);
      });
}

module.exports = { getArticles }