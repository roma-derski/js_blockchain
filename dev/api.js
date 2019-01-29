const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');

const thecoin = new Blockchain();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.send('Hi dude, want some blockchain?');
});

app.get('/blockchain', (req, res) => {
    res.send(thecoin);
});

app.post('/transaction', (req, res) => {
    const blockIndex = thecoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient);
    res.json({ note: `Transaction will be added to block ${blockIndex}`});
});

app.get('/mine', (req, res) => {
    res.send('Hi dude');
});


app.listen(3000, () => console.log('listening on 3000...'));