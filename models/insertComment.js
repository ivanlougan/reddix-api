const db = require('../db/connection')

function insertComment({body, votes, author, article_id, created_at}) {
    return db.query(`
        INSERT INTO comments (body, votes, author, article_id, created_at)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `, [body, votes, author, article_id, created_at])
    .then(({ rows }) => {
        return rows[0];
    });
}

module.exports = insertComment;