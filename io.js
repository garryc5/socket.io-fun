var io = require('socket.io')();


io.on('connection',function(socket)
{
    socket.on('add-circle', function (data) {
        io.emit('add-circle', data);
    });

    socket.on('clear-circles',function()
    {
    io.emit('clear-circles')
    });


});


module.exports = io;