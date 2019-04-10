const express = require('express');
const path = require('path');
const { server: { port } } = require('../config.js');
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
    app.use('/api', apiRouter);
    app.use('/', indexRouter);
  })
  .catch((err) => {
    /**
     * TODO
     * Add a database error route
     */
    console.log(err);
    app.get('*', (req, res) => res.send('Could not connect to the database!'));
  });

app.listen(port, () => console.log(`App listening on port ${port}!`));
