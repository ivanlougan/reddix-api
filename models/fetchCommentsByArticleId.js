const db = require('../db/connection');

function fetchCommentsByArticleId(id, sort_by = "created_at", order = "DESC") {
    const validCols = ["created_at", "article_id", "votes", "author"];
    const validOrder = ["ASC", "DESC"];
  
    if (!validCols.includes(sort_by)) sort_by = "created_at";
    if (!validOrder.includes(order)) order = "DESC";
    return db.query(`
        SELECT * 
        FROM comments 
        WHERE comments.article_id = $1 
        ORDER BY ${sort_by} ${order} 
        `, [id])
        .then(({ rows }) => {
            if(rows.length === 0) {
                return Promise.reject({ status: 404, message: `Not Found`});
            }
            return rows;
        })
}

module.exports = fetchCommentsByArticleId;