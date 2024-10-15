const { fetchEndpoints } = require('../models/fetchEndpoints')

function getEndpoints(req, response) {

    fetchEndpoints().then((endpoints) => {
        response.status(200).send(endpoints);

    })
    
}

module.exports = { getEndpoints }