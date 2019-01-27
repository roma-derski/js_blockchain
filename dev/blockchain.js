function Blockchain() {
    this.chain = []; // existing blocks
    this.newTransactions = [];
}

Blockchain.prototype.createNewBlock = function(nonce, prevoiusBlockHash, Hash) {
    const newBlock = {
        index: this.chain.length + 1,
        timestamp: Data.now(),
        transactions: this.newTransactions, // put all pending txs into this new block
        nonce = nonce,
        hash: hash,
        prevoiusBlockHash: prevoiusBlockHash
    };

    this.newTransactions = []; // starting over for the next block
    this.chain.push(newBlock);

    return newBlock;
}



