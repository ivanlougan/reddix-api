const fs = require('fs/promises');
const path = require('path');

function fetchEndpoints() {
    const filePath = path.join(__dirname, '../endpoints.json');
  
    return fs.readFile(filePath, 'utf8').then((endpoints) => {
        return JSON.parse(endpoints);
    });
      
}

module.exports = { fetchEndpoints };