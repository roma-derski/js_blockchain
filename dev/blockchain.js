const sha256 = require('sha256');
const currentNodeUrl = process.argv[3];
const uuidv1 = require('uuid/v1');

function Blockchain() {
    this.chain = []; // existing blocks
    this.pendingTransactions = [];

    this.currentNodeUrl = currentNodeUrl;
    this.networkNodes = [];

    this.createNewBlock(100, '0', '0'); // arbitrary params for a GENESIS block
}

Blockchain.prototype.createNewBlock = function(nonce, previousBlockHash, hash) {
    const newBlock = {
        index: this.chain.length + 1,
        timestamp: Date.now(),
        transactions: this.pendingTransactions, // put all pending txs into this new block
        nonce: nonce,
        hash: hash,
        previousBlockHash: previousBlockHash
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

Blockchain.prototype.chainIsValid = function(blockchain) {
    let validChain = true;

    for (let i = 1; i < blockchain.length; i++) {
        const currentBlock = blockchain[i];
        const previousBlock = blockchain[i-1];
        const blockHash = this.hashBlock(
            previousBlock['hash'], 
            // TODO check if can make it shorter
            {
                transactions: currentBlock['transactions'], 
                index: currentBlock['index']
            },
            currentBlock['nonce']
            );
        if (blockHash.substring(0,4) !== '0000') {
            validChain = false;
            break;
        }
        if (currentBlock['previousBlockHash'] !== previousBlock['hash']) {
            validChain = false;
            break;
        }
    };
    
    const genesisBlock = blockchain[0];
    const correctNonce = genesisBlock['nonce'] === 100;
    const correctPreviousBlockHash = genesisBlock['previousBlockHash'] === '0';
    const correctHash = genesisBlock['hash'] = '0';
    const correctTxs = genesisBlock['transactions'].length === 0;
    if (!correctNonce || !correctPreviousBlockHash || !correctHash || !correctTxs) {
        validChain = false;
    }
    
    return validChain;
};

Blockchain.prototype.getBlock = function(blockHash) {
    let thatBlock = null;
    this.chain.forEach( block => {
        if (block['hash'] === blockHash) {
            thatBlock = block;
        }
    });
    return thatBlock;
}


Blockchain.prototype.getTransaction = function(txId) {
    let thatTx = null;
    let thatBlock = null;
    this.chain.forEach( block => {
        block['transactions'].forEach (tx => {
            if (tx['transactionId'] === txId) {
                thatTx = tx;
                thatBlock = block;
            }
        })
    })
    return {thatTx, thatBlock};
}

Blockchain.prototype.getAddressData = function(address) {
    const addressTxs = [];
    this.chain.forEach( block => {
        block.transactions.forEach( tx => {
            if (tx.sender === address || tx.recipient === address ) {
                addressTxs.push(tx);
            }
        })
    })

    let balance = 0;
    addressTxs.forEach( tx => {
        if ( tx.recipient === address ) {
            balance += tx.amount;
        } else if ( tx.sender === address) {
            balance -= tx.amount;
        }
    })

    return {
        addressTransactions: addressTxs,
        addressBalance: balance
    }
}

module.exports = Blockchain;


