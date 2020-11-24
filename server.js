require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const io = require('socket.io')(server, {
	cors: {
		origin: '*',
	},
});

const PORT = process.env.SERVER_PORT || 1234;
server.listen(PORT, () => {
	console.log(`Server started on port ::${PORT}`);
});

const rooms = {};
const currentRoomMessages = {};

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/createRoom', (req, res, next) => {
	const room = {
		id: uuidv4(),
		name: req.body.name,
	};
	rooms[room.id] = room;
	currentRoomMessages[room.id] = [];
	res.json(room);
});

app.get('/rooms/:id', (req, res, next) => {
	const id = req.params.id;
	const data = {
		currentRoom: { ...rooms[id] },
		currentRoomMessages: currentRoomMessages[id],
	};
	res.json(data);
});

app.get('/rooms', (req, res, next) => {
	res.json(rooms);
});

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, 'client/build')));
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, 'client/build', 'index.html'), (err) => {
			if (err) next(err);
			else console.log('Sended index.html');
		});
	});
}

app.get('/*', (req, res, next) => {
	res.send('How are you?');
});

app.use((req, res, next) => {
	next(new NotFoundError());
});

app.use((err, req, res, next) => {
	res.status(err.status);
	switch (err.status) {
		case 404:
			res.status(404).json({ error });
			break;
		default:
			res.status(500).json({ error: 'Unexpected error' });
	}
});

io.on('connection', (socket) => {
	console.log(`Connection established on socket.id: ${socket.id}`);

	socket.on('disconnect', () => {
		console.log(`Connection closed on socket.id: ${socket.id}`);
	});

	socket.on('addedNewRoom', () => {
		socket.broadcast.emit('addedNewRoom');
	});

	socket.on('send-message-server', (data) => {
		if (currentRoomMessages[data.roomId]) {
			currentRoomMessages[data.roomId].push(data.message);
		}
		socket.broadcast.emit('get-message-server', data);
	});
});
