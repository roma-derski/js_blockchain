const Blockchain = require('./blockchain');

const qacoin = new Blockchain();

qacoin.createNewBlock(11, 'AAA111', 'BBB222');
qacoin.createNewBlock(25, 'CCC333', 'DDD444');
qacoin.createNewBlock(81, 'EEE555', 'FFF666');

console.log(qacoin.getLastBlock());