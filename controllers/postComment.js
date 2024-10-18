const insertComment = require('../models/insertComment')

function postComment(request, response, next) {
    const newComment = request.body;
    
    insertComment(newComment)
    .then((comment) => {
        response.status(201).send({comment: comment});
    })
    .catch((err) => {
        next(err)
    });
}

module.exports = { postComment }