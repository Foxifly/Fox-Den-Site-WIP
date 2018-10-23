/* anything socket.on
server is listening to receive from alts
anything io.emit
server is emitting to alts*/
//server

var fs = require('fs');
const privateKey = fs.readFileSync('/var/www/certs/foxden/foxdenedm.com/privkey2.pem', 'utf8');
const certificate = fs.readFileSync('/var/www/certs/foxden/foxdenedm.com/cert2.pem', 'utf8');
const ca = fs.readFileSync('/var/www/certs/foxden/foxdenedm.com/chain2.pem', 'utf8');
var express = require('express');
var app = express();
var http = require('https');
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  next();
});
var server = http.createServer({ key: privateKey, cert: certificate }, app);
const io = require('socket.io')(server);
server.listen(3000);
//io = socket.listen(server, { log: false, origins: '*:*' });


var stdin = process.openStdin();
io.on('connection', function (socket) {
  socket.on('nowplaying', (title, author, djUsername, waitlistLength, songCount) => {
    io.emit('songUpdate', title, author, djUsername, waitlistLength, songCount);
  });


  socket.on('getUpdate', () => { //gets it from site and pushes it down to Fox Bot.
    io.emit('getSiteUpdate'); //event fired to Fox Bot.
  });


  socket.on('pushSiteUpdate', (userCount, currUsers, songCount, waitlistLength, title, author, djUsername) => {
    io.emit('contentUpdate', userCount, currUsers);
    io.emit('songUpdate', title, author, djUsername, waitlistLength, songCount);
  });

  socket.on('updateUsers', (userCount, currUsers) => {
    io.emit('pushUpdateUsers', userCount, currUsers);
  });

  socket.on('updateWaitList', (waitlistLength) => {
    io.emit('pushWaitlist', waitlistLength);
  });

  socket.on('disconnect', function () {
    io.emit('user disconnected');
  });
});