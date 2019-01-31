const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');
const uuidv1 = require('uuid/v1');
const PORT = process.argv[2];
const rp = require('request-promise');

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


app.post('/register-and-broadcast-node', (req, res) => {
    const newNodeUrl = req.body.newNodeUrl;
    if (thecoin.networkNodes.indexOf(newNodeUrl) == -1) {
        thecoin.networkNodes.push(newNodeUrl);
    }
    
    const regNodesPromises = [];
    thecoin.networkNodes.forEach(networkNodeUrl => {
        const requestOptions = {
            uri: networkNodeUrl + '/register-node',
            method: 'POST',
            body: { networkNodeUrl: newNodeUrl },
            json: true
        }
        regNodesPromises.push(pr(requestOptions));
    });
    
    Promise.all(regNodesPromises)
    .then(data => {
        const bulkRegisterOptions = {
            uri: newNodeUrl + '/register-node-bulk',
            method: 'POST',
            body: { allNetworkNodes: [...thecoin.networkNodes, thecoin.currentNodeUrl] },
            json: 'true'
        };
        return rp(bulkRegisterOptions)
    })
    .then(data => {
        res.json({ note: 'New node registered with network!'})
    })
})

app.post('/register-node', (req, res) => {
    const newNodeUrl = req.body.networkNodeUrl;
    const nodeNotRegistered = thecoin.networkNodes.indexOf(newNodeUrl) == -1;
    const nodeNotCurrent = thecoin.currentNodeUrl !== newNodeUrl;
    if (nodeNotRegistered && nodeNotCurrent) {
        thecoin.networkNodes.push(newNodeUrl);
    }
    res.json({ note: 'New node registered!'});
})

app.post('/register-node-bulk', (req, res) => {

})

app.listen(PORT, () => console.log(`listening on ${PORT}...`));