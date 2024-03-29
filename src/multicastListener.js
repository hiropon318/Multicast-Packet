const HOST_RECEIVER = "192.168.4.2";
const CLIENT_PORT = 64284;
const MULTICAST_ADDRESS = "230.255.192.1";

var dgram = require('dgram');
var client = dgram.createSocket('udp4');

client.on('listening', () => {
  client.setBroadcast(true);
  client.setMulticastTTL(128);
  client.addMembership(MULTICAST_ADDRESS);
  client.setMulticastInterface(HOST_RECEIVER, CLIENT_PORT);
});

client.on('message', (msg, rinfo) => {
  console.log(msg.toString());
  console.log(rinfo);
});

client.bind(CLIENT_PORT, HOST_RECEIVER);