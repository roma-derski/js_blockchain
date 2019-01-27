function Blockchain() {
    this.chain = []; // existing blocks
    this.newTransactions = [];
}

Blockchain.prototype.createNewBlock = function(nonce, prevoiusBlockHash, hash) {
    const newBlock = {
        index: this.chain.length + 1,
        timestamp: Date.now(),
        transactions: this.newTransactions, // put all pending txs into this new block
        nonce: nonce,
        hash: hash,
        prevoiusBlockHash: prevoiusBlockHash
    };

    this.newTransactions = []; // starting over for the next block
    this.chain.push(newBlock);

    return newBlock;
}

Blockchain.prototype.getLastBlock = function() {
    return this.chain[this.chain.length - 1];
}






module.exports = Blockchain;


