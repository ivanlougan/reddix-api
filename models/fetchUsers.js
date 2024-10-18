const db = require('../db/connection')

function fetchUsers() {
    return db.query(`SELECT * FROM users`)
}

module.exports = fetchUsers;