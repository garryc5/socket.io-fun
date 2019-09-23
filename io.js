var io = require('socket.io')();
var players = {};

io.on('connection',function(socket)
{
     socket.on('register-player', function (initials) {
        players[socket.id] = initials
        io.emit('update-player-list',Object.values(players));
    });
    socket.on('disconnect', function () {
        delete players[socket.id];
        io.emit('update-player-list', Object.values(players));
      });
    socket.on('add-circle', function (data) {
        io.emit('add-circle', data);
    });

    socket.on('clear-circles',function()
    {
    io.emit('clear-circles')
    });


});


module.exports = io;