const Blockchain = require('./blockchain');

const qacoin = new Blockchain();

qacoin.createNewBlock(11, 'AAA111', 'BBB222');

console.log(qacoin);