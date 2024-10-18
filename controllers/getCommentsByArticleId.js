const fetchCommentsByArticleId = require('../models/fetchCommentsByArticleId')

function getCommentsByArticleId(request, response, next) {
    const { sort_by = 'created_at', order = 'DESC' } = request.query;
    const { article_id } = request.params
    fetchCommentsByArticleId(article_id, sort_by, order).then((comments) => {
        response.status(200).send(comments);
    }).catch((err) => {
        next(err)
    })
}

module.exports = { getCommentsByArticleId }