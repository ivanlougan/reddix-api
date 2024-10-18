const updateArticle = require('../models/updateArticle')

function patchArticle(request, response, next) {
  const { article_id } = request.params;
  const { inc_votes } = request.body;
  updateArticle(article_id, inc_votes)
    .then((updatedArticle) => {
      response.status(200).send({ article: updatedArticle });
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = { patchArticle };