var dgram = require('dgram');
var cluster = require('cluster');

const server = dgram.createSocket('udp4');

if (cluster.isPrimary) {
  cluster.fork();
}else{
  server.bind(6000, () => {
    server.addMembership('230.1.1.1');
  });
}

server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});

server.on('listening', () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});