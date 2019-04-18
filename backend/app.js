const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { server: { port } } = require('./config.js');
const dbConnect = require('./db/db');
const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');

const app = express();
app.use('/static', express.static(path.resolve(__dirname, '../dist')));


// Connect to the database and send error route on failure
dbConnect()
  .then((db) => {
    app.use((req, res, next) => {
      req.db = db;
      next();
    });
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use('/api', apiRouter);
    app.use('/', indexRouter);
  })
  .catch((err) => {
    /**
     * TODO
     * Add a database error route
     */
    console.log(err);
    app.get('*', (req, res) => res.send('Database is currently down, come back later!'));
  });

app.listen(port, () => console.log(`App listening on port ${port}!`));
