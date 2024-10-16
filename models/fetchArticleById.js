const db = require('../db/connection');

function fetchArticleById(id) {
    return db.query(`SELECT * FROM articles WHERE article_id = $1`, [id])
        .then(({ rows }) => {
            if(rows.length === 0) {
                return Promise.reject({ status: 404, message: `Not Found`});
            }
            return rows[0];
        })
}

module.exports = fetchArticleById;