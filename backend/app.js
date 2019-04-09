const express = require('express');
const path = require('path');

const app = express();
const port = 3000;
const HTML_DIR = path.resolve(__dirname, '../dist');
app.use('/static', express.static(HTML_DIR));

app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, '../dist/index.html')));

app.listen(port, () => console.log(`App listening on port ${port}!`));
