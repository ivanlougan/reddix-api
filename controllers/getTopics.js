const { fetchTopics } = require('../models/fetchTopics')

function getTopics(req, response) {
    
    fetchTopics().then((topics) => {
        response.status(200).send(topics);
    })
}

module.exports = { getTopics };