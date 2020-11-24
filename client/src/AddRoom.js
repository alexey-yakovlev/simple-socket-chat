import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createRoom } from './actions';
import socket from './socket';

const AddRoom = () => {
	const [roomName, setRoomName] = useState('');
	const [error, setError] = useState('');
	const dispatch = useDispatch();

	const enterInChat = () => {
		if (!roomName) {
			setError('Room name should not be empty');
			return;
		}
		setError('');
		dispatch(createRoom(roomName));
		socket.emit('addedNewRoom');
	};

	return (
		<div>
			<span>Create new room</span>
			<input
				type="text"
				name="roomName"
				placeholder="Room name"
				value={roomName}
				onChange={(e) => setRoomName(e.target.value)}
			/>
			<button onClick={enterInChat}>Create</button>
			{error ? (
				<blockquote>
					<em>Error: {error}</em>
				</blockquote>
			) : null}
		</div>
	);
};

export default AddRoom;
