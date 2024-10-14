const { fetchTopics } = require('../models/fetchTopics')

function getTopics(request, response) {
    
    fetchTopics().then((topic) => {
        response.status(200).send(topic)
    })
}

module.exports = {getTopics};