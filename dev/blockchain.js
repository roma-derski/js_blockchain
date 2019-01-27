const sha256 = require('sha256');

function Blockchain() {
    this.chain = []; // existing blocks
    this.pendingTransactions = [];
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
        recipient: recipient
    }

    this.pendingTransactions.push(newTransaction);

    return this.getLastBlock()['index'] + 1;
}

Blockchain.prototype.hashBlock = function(previousBlockHash, currentBlockData, nonce) {
    const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
    const hash = sha256(dataAsString);
    return hash;
}





module.exports = Blockchain;


