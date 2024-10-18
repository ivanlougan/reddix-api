const removeComment = require('../models/removeComment');

function deleteCommentById(request, response, next) {
    const { comment_id } = request.params;
    removeComment(comment_id)
    .then(() => {
        response.status(204).send({})
    })
    .catch((err) => {
        next(err)
    });
}

module.exports = { deleteCommentById }