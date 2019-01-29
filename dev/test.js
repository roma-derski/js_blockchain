const Blockchain = require('./blockchain');

const qacoin = new Blockchain();

qacoin.createNewBlock(11, 'AAA111', 'BBB222');

qacoin.createNewTransaction(100, 'Alice123', 'Bob456');
qacoin.createNewBlock(81, 'EEE555', 'FFF666');

qacoin.createNewTransaction(20, 'Bob456', 'John123');
qacoin.createNewTransaction(30, 'Bob456', 'Randy231');
qacoin.createNewBlock(25, 'CCC333', 'DDD444');


const previousBlockHash = 'ASDFA234SDFAS234DFADSFA234SDFASD1234';
const currentBlockData = [
    {
        amount: 11,
        sender: 'Alice123',
        recipient: 'Bob234'
    },
    {
        amount: 19,
        sender: 'Bob234',
        recipient: 'Jim244'
    }
]
const nonce = 100;



const findNonce = qacoin.proofOfWork(previousBlockHash, currentBlockData);

const hash = qacoin.hashBlock(previousBlockHash, currentBlockData, findNonce);

//console.dir(qacoin);
console.log(findNonce, hash);
