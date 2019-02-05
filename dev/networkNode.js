const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');
const uuidv1 = require('uuid/v1');
const PORT = process.argv[2];
//const rp = require('request-promise');
const axios = require('axios');
//axios.defaults.headers.common = {
//    "Content-Type": "application/json"
//}

const nodeAddress = uuidv1().split('-').join(''); //removing dashes

const thecoin = new Blockchain();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

process.on('unhandledRejection', error => {
    console.error('Caught exception: ', error);
    process.exit(1);
})


app.get('/', (req, res) => {
    res.send('Hi dude, want some blockchain?');
});

app.get('/blockchain', (req, res) => {
    res.send(thecoin);
});

app.post('/transaction', (req, res) => {
    const newTransaction = req.body;
    const blockIndex = thecoin.addTxToPendingTxs(newTransaction);
    res.json({ note: `Transaction to be added to block ${blockIndex}.`});
});

app.post('/transaction/broadcast', (req, res) => {
    const newTx = thecoin
        .createNewTransaction(req.body.amount, req.body.sender, req.body.recipient);
    thecoin.addTxToPendingTxs(newTx);

    // TODO: refactor to .map
    const broadcastTxPromises = [];
    thecoin.networkNodes.forEach(networkNodeUrl => {
        const requestOptions = {
            baseURL: networkNodeUrl,
            url: '/transaction',
            method: 'post',
            data: newTx
        }
        broadcastTxPromises.push(axios.request(requestOptions));
    })

    Promise.all(broadcastTxPromises)
    .then( () => {
        res.json({ note: 'New transaction created and broadcasted!'})
    })
    .catch(error => {
        console.log('error: -----', error);
        //res.send(error);
    });
})

app.get('/mine', (req, res) => {
    const lastBlock = thecoin.getLastBlock();
    const lastBlockHash = lastBlock['hash'];
    const currentBlockData = {
        transactions: thecoin.pendingTransactions,
        index: lastBlock['index'] + 1
        // TODO: include other props?
    }
    const nonce = thecoin.proofOfWork(lastBlockHash, currentBlockData);
    const blockHash = thecoin.hashBlock(lastBlockHash, currentBlockData, nonce);      
    const newBlock = thecoin.createNewBlock(nonce, lastBlockHash, blockHash);

    newBlockPromises = [];
    thecoin.networkNodes.forEach(networkNodeUrl => {
        const requestOptions = {
            baseURL: networkNodeUrl,
            url: '/receive-new-block',
            method: 'post',
            data: { newBlock }
        }
        
        newBlockPromises.push(axios.request(requestOptions));
    })

    Promise.all(newBlockPromises)
    .then( () => {
        const newBlockRewardTx = thecoin.createNewTransaction(12.5, "00", nodeAddress);
        const requestOptions = {
            baseURL: thecoin.currentNodeUrl,
            url: '/transaction/broadcast',
            method: 'post',
            data: newBlockRewardTx
        }
        return axios.request(requestOptions);
    })
    .then( () => {
        res.json({
            note: "New block mined and broadcasted!",
            block: newBlock
        })
    })
});

app.post('/receive-new-block', (req, res) => {
    const newBlock = req.body.newBlock;
    const lastBlock = thecoin.getLastBlock();
    const correctHash = lastBlock['hash'] === newBlock['previousBlockHash'];
    const correctIndex = (lastBlock['index'] + 1) === newBlock['index'];
    
    if (correctHash && correctIndex) {
        thecoin.chain.push(newBlock);
        thecoin.pendingTransactions = [];
        res.json({ 
            note: 'New block accepted!',
            newBlock
        });
    } else {
        res.json({ 
            note: 'New block rejected :(',
            newBlock
        })
    }

})

app.post('/register-and-broadcast-node', (req, res) => {
    const newNodeUrl = req.body.newNodeUrl;
    if (thecoin.networkNodes.indexOf(newNodeUrl) == -1) {
        thecoin.networkNodes.push(newNodeUrl);
    }
    
    const regNodesPromises = [];
    thecoin.networkNodes.forEach(networkNodeUrl => {
        const requestOptions = {
            baseURL: networkNodeUrl,
            url: '/register-node',
            method: 'post',
            data: { newNodeUrl }
        }
        
        regNodesPromises.push(axios.request(requestOptions));
    });
    

    Promise.all(regNodesPromises)
    .then( () => {
        const bulkRegisterOptions = {
            baseURL: newNodeUrl,
            url: '/register-nodes-bulk',
            method: 'post',
            data: { allNetworkNodes: [...thecoin.networkNodes, thecoin.currentNodeUrl] }
        };

        return axios.request(bulkRegisterOptions);
    })
    .then( () => {
        res.json({ note: 'New node registered with network!'})
    })
    .catch(error => {
        res.send(error);
    });
});

// send url of the new node to network to register it on all nodes
app.post('/register-node', (req, res) => {
    const newNodeUrl = req.body.newNodeUrl;
    const nodeNotRegistered = thecoin.networkNodes.indexOf(newNodeUrl) == -1;
    const nodeNotCurrent = thecoin.currentNodeUrl !== newNodeUrl;
    if (nodeNotRegistered && nodeNotCurrent) {
        thecoin.networkNodes.push(newNodeUrl);
    }
    res.json({ note: 'New node registered!'});
})

// let the new node register all nodes already present in network
app.post('/register-nodes-bulk', (req, res) => {
    const allNetworkNodes = req.body.allNetworkNodes;
    allNetworkNodes.forEach(networkNodeUrl => {
        const nodeNotRegistered = thecoin.networkNodes.indexOf(networkNodeUrl) == -1;
        const notCurrentNode = thecoin.currentNodeUrl !== networkNodeUrl;
        if (nodeNotRegistered && notCurrentNode) {
            thecoin.networkNodes.push(networkNodeUrl);
        }
    })
    res.json({ node: 'Bulk registration done!'});
})



app.listen(PORT, () => console.log(`listening on ${PORT}...`));