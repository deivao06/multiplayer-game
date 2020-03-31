import express from 'express';
import http from 'http';
import createGame from "./public/Game.js";
import socketio from 'socket.io';

var app = express();
var server = http.createServer(app);
var sockets = socketio(server);

app.use(express.static('public'));

var game = createGame();
game.start();

game.subscribe((command) => {
    console.log(`> Emitting ${command.type}`);

    sockets.emit(command.type, command);
});

sockets.on('connection', (socket) => {
    var playerId = socket.id;
    var playerName = socket.handshake.query.playerName;
    console.log(`> Player connected on Server with id: ${playerId}`);

    game.addPlayer({playerId: playerId, playerName: playerName});
    socket.emit('setup', game.state);

    socket.on('disconnect', () => {
        game.removePlayer({playerId: playerId});
        console.log(`> Player disconnected: ${playerId}`);
    });

    socket.on('move-player', (command) => {
        command.playerId = playerId;
        command.type = 'move-player';

        game.movePlayer(command);
    });
});

server.listen(8080, () => {
    console.log('> Server listening on port: 8080');
});