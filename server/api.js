const express = require('express');
const apiRouter = express.Router();

const quotesRouter = require('./quotes');

apiRouter.use(express.static('public'));
apiRouter.use('/quotes', quotesRouter);

module.exports = apiRouter;