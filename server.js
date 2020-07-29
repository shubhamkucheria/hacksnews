const express = require('express');

const app = express();

app.use(express.static('./dist/hacker-news-app'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/hacker-news-app/'}),
);

app.listen(process.env.PORT || 8080);

console.log("Server Started at : ",  process.env.PORT || 8080);