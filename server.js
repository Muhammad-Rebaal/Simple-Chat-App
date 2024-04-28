const io = require('socket.io')(3000)

const users = {}

// const cors = require('cors'); // Add cors package

// const app = express(); // Assuming you're using Express framework
// app.use(cors({ origin: 'http://localhost:8080' })); // Allow requests from your client origin

// // const io = require('socket.io')(app); 


io.on('connection', socket => {
  socket.on('new-user', name => {
    users[socket.id] = name
    io.emit('user-connected', name) // emit to all connected sockets
  })
  socket.on('send-chat-message', message => {
    io.emit('chat-message', { message: message, name: users[socket.id] }) // emit to all connected sockets
  })
  socket.on('disconnect', () => {
    io.emit('user-disconnected', users[socket.id]) // emit to all connected sockets
    delete users[socket.id]
  })
})
