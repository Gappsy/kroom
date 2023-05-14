var express = require("express")
var app = express();

const http = require('http');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const defURL = "http://localhost:8080/"

app.use(express.static('public'));

// set the view engine to ejs
app.set("view engine", "ejs");

// login page
app.get('/', function(req, res){
	res.render("pages/login", {socketURL:defURL});
});
// menu page
app.get('/menu', function(req, res){
	res.render("pages/menu", {socketURL:defURL});
});
// chatroom page
app.get('/chatroom', function(req, res){
	res.render("pages/chatroom", {socketURL:defURL});
});
// 
io.sockets.on('connection', function(socket) {
    socket.on('username', function(username) {
        socket.username = username;
        io.emit('is_online', '🔵 <i>' + socket.username + ' join the chat..</i>');
    });

    socket.on('disconnect', function(username) {
        io.emit('is_online', '🔴 <i>' + socket.username + ' left the chat..</i>');
    })

    socket.on('chat_message', function(message) {
        io.emit('chat_message', '<strong>' + socket.username + '</strong>: ' + message);
    });

});

server.listen(8080);
console.log("server is listening on port: 8080");

