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
		<>
			<div className="row">
				<div className="column column-50 column-offset-25">
					<span>Create new room</span>
					<input
						type="text"
						name="roomName"
						placeholder="Room name"
						value={roomName}
						onChange={(e) => setRoomName(e.target.value)}
					/>
				</div>
			</div>
			<div className="row">
				<div className="column column-50 column-offset-25">
					<button onClick={enterInChat}>Create</button>
					{error ? (
						<blockquote>
							<em>Error: {error}</em>
						</blockquote>
					) : null}
				</div>
			</div>
		</>
	);
};

export default AddRoom;
