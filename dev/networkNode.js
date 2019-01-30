const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');
const uuidv1 = require('uuid/v1');
const PORT = process.argv[2];

const nodeAddress = uuidv1().split('-').join(''); //removing dashes

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
    const lastBlock = thecoin.getLastBlock();
    const lastBlockHash = lastBlock['hash'];
    const currentBlockData = {
        transactions: thecoin.pendingTransactions,
        index: lastBlock['index'] + 1,
        // add other props
    }
    const nonce = thecoin.proofOfWork(lastBlockHash, currentBlockData);
    const blockHash = thecoin.hashBlock(lastBlockHash, currentBlockData, nonce);       
    
    thecoin.createNewTransaction(12.5, "00", nodeAddress);

    const newBlock = thecoin.createNewBlock(nonce, lastBlockHash, blockHash);
    
    res.json({
        note: "New block mined!",
        block: newBlock
    })
});


app.listen(PORT, () => console.log(`listening on ${PORT}...`));