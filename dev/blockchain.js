const sha256 = require('sha256');
const currentNodeUrl = process.argv[3];
const uuidv1 = require('uuid/v1');

function Blockchain() {
    this.chain = []; // existing blocks
    this.pendingTransactions = [];

    this.currentNodeUrl = currentNodeUrl;
    this.networkNodes = [];

    this.createNewBlock(100, '0', '0'); // arbitrary params for a genesis block
}

Blockchain.prototype.createNewBlock = function(nonce, prevoiusBlockHash, hash) {
    const newBlock = {
        index: this.chain.length + 1,
        timestamp: Date.now(),
        transactions: this.pendingTransactions, // put all pending txs into this new block
        nonce: nonce,
        hash: hash,
        prevoiusBlockHash: prevoiusBlockHash
    };

    this.pendingTransactions = []; // starting over for the next block
    this.chain.push(newBlock);

    return newBlock;
}

Blockchain.prototype.getLastBlock = function() {
    return this.chain[this.chain.length - 1];
}

Blockchain.prototype.createNewTransaction = function(amount, sender, recipient) {
    const newTransaction = {
        amount: amount,
        sender: sender,
        recipient: recipient,
        transactionId: uuidv1().split('-').join('')
    }

    return newTransaction;
}

Blockchain.prototype.addTxToPendingTxs = function(txObject) {
    this.pendingTransactions.push(txObject);
    return this.getLastBlock['index'] + 1;
}

Blockchain.prototype.hashBlock = function(previousBlockHash, currentBlockData, nonce) {
    const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
    const hash = sha256(dataAsString);
    return hash;
}

Blockchain.prototype.proofOfWork = function(previousBlockHash, currentBlockData) {
    let nonce = 0;
    let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
    while (hash.substring(0,4) !== '0000') {
        nonce++;
        hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
    }

    return nonce;
}



module.exports = Blockchain;


