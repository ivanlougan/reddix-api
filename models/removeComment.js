const db = require('../db/connection');

function removeComment(id) {
    return db.query(`
        DELETE FROM comments 
        WHERE comment_id = $1 RETURNING *
        `, 
        [id])
        .then((data) => {
            if(data.rows.length === 0) {
                return Promise.reject({ status: 404, message: `Not Found`});
            }
        })
}

module.exports = removeComment;