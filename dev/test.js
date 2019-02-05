const Blockchain = require('./blockchain');

const qacoin = new Blockchain();

const bc1 = {
    "chain": [
    {
    "index": 1,
    "timestamp": 1549387602413,
    "transactions": [],
    "nonce": 100,
    "hash": "0",
    "previousBlockHash": "0"
    },
    {
    "index": 2,
    "timestamp": 1549387642637,
    "transactions": [],
    "nonce": 18140,
    "hash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100",
    "previousBlockHash": "0"
    },
    {
    "index": 3,
    "timestamp": 1549387695590,
    "transactions": [
    {
    "amount": 12.5,
    "sender": "00",
    "recipient": "341dd2c0296b11e990fc8f1240bae8d0",
    "transactionId": "4c1ed7c0296b11e990fc8f1240bae8d0"
    }
    ],
    "nonce": 156024,
    "hash": "0000d0aebd5fad2e263b09ab46ac5c68664ddf55f291d2afb702583d9a9f00b3",
    "previousBlockHash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100"
    },
    {
    "index": 4,
    "timestamp": 1549387699832,
    "transactions": [
    {
    "amount": 12.5,
    "sender": "00",
    "recipient": "341dd2c0296b11e990fc8f1240bae8d0",
    "transactionId": "6ba8b9d0296b11e990fc8f1240bae8d0"
    }
    ],
    "nonce": 12901,
    "hash": "000052be5800a5d6b0396e8d6a0297e65037f4bc11a38a41ae9ae963bf8fa628",
    "previousBlockHash": "0000d0aebd5fad2e263b09ab46ac5c68664ddf55f291d2afb702583d9a9f00b3"
    },
    {
    "index": 5,
    "timestamp": 1549387701140,
    "transactions": [
    {
    "amount": 12.5,
    "sender": "00",
    "recipient": "341dd2c0296b11e990fc8f1240bae8d0",
    "transactionId": "6e2f3da0296b11e990fc8f1240bae8d0"
    }
    ],
    "nonce": 18345,
    "hash": "00000d08f6dba9741c71774df5b825c85f1948395cb1dc876d3ee719c675a259",
    "previousBlockHash": "000052be5800a5d6b0396e8d6a0297e65037f4bc11a38a41ae9ae963bf8fa628"
    },
    {
    "index": 6,
    "timestamp": 1549387764159,
    "transactions": [
    {
    "amount": 12.5,
    "sender": "00",
    "recipient": "341dd2c0296b11e990fc8f1240bae8d0",
    "transactionId": "6ef6ac50296b11e990fc8f1240bae8d0"
    },
    {
    "amount": 10,
    "sender": "FDSGfghdgfjjS124125435",
    "recipient": "DFHDHGDGfghJDJ56795663415",
    "transactionId": "86033f30296b11e990fc8f1240bae8d0"
    },
    {
    "amount": 12,
    "sender": "FDSGfghdgfjjS124125435",
    "recipient": "DFHDHGDGfghJDJ56795663415",
    "transactionId": "893b5fc0296b11e990fc8f1240bae8d0"
    },
    {
    "amount": 15,
    "sender": "FDSGfghdgfjjS124125435",
    "recipient": "DFHDHGDGfghJDJ56795663415",
    "transactionId": "8bb3d9d0296b11e990fc8f1240bae8d0"
    }
    ],
    "nonce": 21241,
    "hash": "000020738e6e84ebe08a807955c85b1e44c0567b9c2910c40f2a56a09f1ec4a2",
    "previousBlockHash": "00000d08f6dba9741c71774df5b825c85f1948395cb1dc876d3ee719c675a259"
    },
    {
    "index": 7,
    "timestamp": 1549387807902,
    "transactions": [
    {
    "amount": 12.5,
    "sender": "00",
    "recipient": "341dd2c0296b11e990fc8f1240bae8d0",
    "transactionId": "94878660296b11e990fc8f1240bae8d0"
    },
    {
    "amount": 25,
    "sender": "FDSGfghdgfjjS124125435",
    "recipient": "DFHDHGDGfghJDJ56795663415",
    "transactionId": "a87a0800296b11e990fc8f1240bae8d0"
    },
    {
    "amount": 55,
    "sender": "FDSGfghdgfjjS124125435",
    "recipient": "DFHDHGDGfghJDJ56795663415",
    "transactionId": "aa602d20296b11e990fc8f1240bae8d0"
    }
    ],
    "nonce": 43825,
    "hash": "0000f148655c77fd671c20628729f8ef3e8757ddfb60773f96f81c47688dae15",
    "previousBlockHash": "000020738e6e84ebe08a807955c85b1e44c0567b9c2910c40f2a56a09f1ec4a2"
    }
    ],
    "pendingTransactions": [
    {
    "amount": 12.5,
    "sender": "00",
    "recipient": "341dd2c0296b11e990fc8f1240bae8d0",
    "transactionId": "ae9a7b70296b11e990fc8f1240bae8d0"
    }
    ],
    "currentNodeUrl": "http://localhost:3001",
    "networkNodes": []
    }



const isValid = qacoin.chainIsValid(bc1.chain);
console.log('is valid: ', isValid);




// qacoin.createNewBlock(11, 'AAA111', 'BBB222');

// qacoin.createNewTransaction(100, 'Alice123', 'Bob456');
// qacoin.createNewBlock(81, 'EEE555', 'FFF666');

// qacoin.createNewTransaction(20, 'Bob456', 'John123');
// qacoin.createNewTransaction(30, 'Bob456', 'Randy231');
// qacoin.createNewBlock(25, 'CCC333', 'DDD444');


// const previousBlockHash = 'ASDFA234SDFAS234DFADSFA234SDFASD1234';
// const currentBlockData = [
//     {
//         amount: 11,
//         sender: 'Alice123',
//         recipient: 'Bob234'
//     },
//     {
//         amount: 19,
//         sender: 'Bob234',
//         recipient: 'Jim244'
//     }
// ]
// const nonce = 100;



// const findNonce = qacoin.proofOfWork(previousBlockHash, currentBlockData);

// const hash = qacoin.hashBlock(previousBlockHash, currentBlockData, findNonce);

// //console.dir(qacoin);
// console.log(findNonce, hash);
