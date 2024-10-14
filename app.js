const express = require("express");
const app = express();
const {getTopics} = require('./controllers/getTopics');

app.use(express.json());


app.get('/api/topics', getTopics);




app.all('*', (req, res) => {
    res.status(404).send({msg: 'URL Not Found'})
})


module.exports = app
