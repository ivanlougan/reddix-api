const db = require("../db/connection")

function fetchArticles(sort_by = "created_at", order = "DESC") {
    const validCols = ["comment_count", "created_at", "article_id", "title", "votes", "author", "topic"];
    const validOrder = ["ASC", "DESC"];
  
    if (!validCols.includes(sort_by)) sort_by = "created_at";
    if (!validOrder.includes(order)) order = "DESC";
    
    return db.query(
        `SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.created_at, articles.votes, articles.article_img_url, 
        COUNT(comments.comment_id):: INT AS comment_count 
        FROM articles JOIN comments ON comments.article_id = articles.article_id 
        GROUP BY articles.article_id
        ORDER BY ${sort_by} ${order}`).then(({ rows }) => {            
            return rows;
        });
}

module.exports = fetchArticles