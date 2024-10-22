const db = require('../db/connection');

function fetchArticleById(id) {
    return db.query(`SELECT
        articles.*,
        COUNT(comments.comment_id) ::INT AS comment_count
        FROM articles
        LEFT JOIN comments
        ON comments.article_id = articles.article_id
        WHERE articles.article_id = $1
        GROUP BY articles.article_id`, [id])
        .then(({ rows }) => {
            if(rows.length === 0) {
                return Promise.reject({ status: 404, message: `Not Found`});
            }
            return rows[0];
        })
}

module.exports = fetchArticleById;