const db = require("../db/connection")

function fetchArticles(sort_by = "created_at", order = "DESC", topic) {
    const validCols = ["comment_count", "created_at", "article_id", "title", "votes", "author", "topic"];
    const validOrder = ["ASC", "DESC"];
  
    if (!validCols.includes(sort_by)) sort_by = "created_at";
    if (!validOrder.includes(order)) order = "DESC";
  
    const queryVals = [];
  
    let queryStr = `
    SELECT
      articles.author,
      articles.title,
      articles.article_id,
      articles.topic,
      articles.created_at,
      articles.votes,
      articles.article_img_url,
    COUNT(comments.comment_id) ::INT AS comment_count
    FROM comments
    RIGHT JOIN articles ON comments.article_id = articles.article_id
    `;
  
    if (topic) {
      queryStr += ` WHERE articles.topic = $1`;
      queryVals.push(topic);
    }
  
    queryStr += `
      GROUP BY articles.article_id
      ORDER BY ${sort_by} ${order}
    `;
    return db.query(queryStr, queryVals).then(({ rows }) => {
      if (rows.length === 0 && topic) {
        return Promise.reject({ status: 404, message: "Topic Not Found" });
      }
      return rows;
    });
}

module.exports = fetchArticles