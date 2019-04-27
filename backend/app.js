const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { server: { port } } = require('./config.js');
const checkAjaxRequest = require('./middleware/checkAjaxRequest');
const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');

const app = express();
app.use('/static', express.static(path.resolve(__dirname, '../dist')));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', apiRouter);
app.use('/', checkAjaxRequest, indexRouter);

app.listen(port, () => console.log(`App listening on port ${port}!`));
