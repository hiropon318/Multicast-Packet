var news = [
  "Test data 1", "Test data 2", "Test data 3", "Test data 4", "Test data 5",
  "Test data 6", "Test data 7", "Test data 8", "Test data 9", "Test data 0"
];

const HOST_SENDER = "192.168.4.2";    //Server's IP address
const HOST_PORT = 64284;                //Server's port
const MULTICAST_ADDRESS = "230.255.192.1";

//Import Datagram library 
var dgram = require('dgram');
var server = dgram.createSocket("udp4"); 

server.on("listening", () => {
  //Configure for multicast traffic
  server.setBroadcast(true)
  server.setMulticastTTL(128);
  server.addMembership(MULTICAST_ADDRESS, HOST_SENDER);
  server.setMulticastInterface(HOST_SENDER);
});

server.bind();
//send multicast message from news[] at 1.5 sec intervals
setInterval(broadcastNew, 1500);

function broadcastNew() {
  //Math.random creates random number between 0 and 1
  var message = news[Math.floor(Math.random()*news.length)];
  server.send(message, 0, message.length, HOST_PORT, MULTICAST_ADDRESS);
  console.log("Sent " + message + " to the wire...");
}