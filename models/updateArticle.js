const db = require('../db/connection')

function updateArticle(article_id, inc_votes) {
    return db.query(`UPDATE articles
        SET votes = votes + $1
        WHERE article_id = $2
      RETURNING *`,
      [inc_votes, article_id]
    )
    .then((result) => {
      return result.rows[0];
    })
}

module.exports = updateArticle;