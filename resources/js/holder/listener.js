/* anything socket.on
server is listening to receive from alts
anything io.emit
server is emitting to alts*/
//server
/*const io = require('socket.io')(3000, {origins:"foxdenedm.com:*"});
var stdin = process.openStdin();
io.on('connection', function (socket) {

  socket.on('nowplaying', (title, author, djUsername) => {
    io.emit('siteUpdate', title, author, djUsername);
  });


  socket.on('disconnect', function () {
    io.emit('user disconnected');
  });
});
*/

var fs = require('fs');
var express = require('express');
var app = express();

//var https = require('https').createServer({
//key: fs.readFileSync('/etc/letsencrypt/live/foxdenedm.com/privkey.pem'),
//cert: fs.readFileSync('/etc/letsencrypt/live/foxdenedm.com/fullchain.pem')}, app);
var https = require('http').Server(app);
var io = require('socket.io')(https);
// app.set('etag', false);
// app.use(function (req, res, next) {
//   res.append('Access-Control-Allow-Origin', ['*']);
//   res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.append('Access-Control-Allow-Headers', 'Content-Type');
//   res.append('Cache-Control', 'private, no-cache, no-store, must-revalidate');
//   res.append('Expires', '-1');
//   res.append('Pragma', 'no-cache');
//   next()
// });

function setHeaders(res, path, stat) {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  res.append('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.append('Expires', '-1');
  res.append('Pragma', 'no-cache');
}


app.use('/', express.static('/var/www/html'), { setHeaders: setHeaders });
app.use(app.router);
routes.initialize(app);

app.get('/', function (req, res) {
  res.sendFile('/var/www/html/secrets/index.html');
});
io.on('connection', function (socket) {
  console.log('a new wild user appeared');
  socket.on('nowplaying', (title, author, djUsername) => {
    io.emit('siteUpdate', title, author, djUsername);
  });


  socket.on('disconnect', function () {
    io.emit('user disconnected');
  });
});

var port = process.env.PORT || 3080;


app.listen(port);
console.log('listen at ' + port);
/*
https.listen(3000, function () {
  console.log('listening on *:3000');
});*/