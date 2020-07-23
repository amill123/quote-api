const quotesRouter = require('express').Router();

module.exports  = quotesRouter;

const { quotes } = require('../data');
const { getRandomElement } = require('../utils');


quotesRouter.get('/random', (req, res, next) => {
    const random = getRandomElement(quotes);
    res.send({quote:random});
});

quotesRouter.get('/', (req, res, next) => {
            const person = req.query;
    if(Object.keys(person).length === 0) {
        res.send({quotes: quotes});
    } else {
        const container = [];
        const personsQuotes = quotes.forEach(item => {
            if(item.person === person.person){
                container.push(item);
            }
        });
        res.send({quotes: container});
    }

});

quotesRouter.post('/', (req, res, next) => {
    const person = req.query.person;
    const quote = req.query.quote;
    if(person !== '' && quote !== '') {
        const quoteObj = {quote: quote, person: person};
        quotes.push(quoteObj);
        res.send({quote: quoteObj});
    } else {
        res.status(400).send('Not enough information given to create a quote');
    }
});


//TODO The below 3 requests are not hooked up to the front-end...yet

quotesRouter.get('/:id', (req, res, next) => {
    //Checks the id is valid. If it is out of bounds it will send a 404 error.
    //Otherwise it will find the object where the id matches the input id and returns it as an object.
    const id = req.params.id;

    if(id<0 || id >= quotes.length) {
        res.status(404).send('Quote not found in database');
    } else {
        const quote = quotes.find(obj => obj.id === id);
        res.send({quote: quote});
    }
});

quotesRouter.put('/:id', (req, res, next) => {
    //Checks the id is valid. If it is out of bounds it will send a 404 error.
    //If both the quote and person are empty then it will send a 400 error
    //Otherwise it will find the object where the id matches the input id, update the quote and name if they are not empty strings and then returns the quote as an object.
    const id = req.params.id;

    if(id<0 || id >= quotes.length) {
        res.status(404).send('Quote not found in database');
    } else if(req.query.quote === '' && req.query.person === ''){
        res.status(400).send('Empty quote and name');
    } else {
        const quote = quotes.find(obj => obj.id === id);
        if(req.query.quote !== ''){
            quote.quote = req.query.quote;
        }
        if(req.query.person !== ''){
            quote.person = req.query.person;
        }
        res.send({quote: quote});
    }
});

quotesRouter.delete('/:id', (req, res, next) => {
    
    //Checks the id is valid. If it is out of bounds it will send a 404 error.
    //Otherwise it will find the object where the id matches the input id, remove it from the quotes array and return a 204 status.
    const id = req.params.id;

    if(id < 0 || id >= quotes.length) {
        res.status(404).send('Quote not found in database');
    } else {
        const quoteIndex = quotes.findIndex(obj => obj.id === id);
        quotes.splice(quoteIndex);
        res.sendStatus(204);
    }
});