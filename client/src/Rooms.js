import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRooms, joinRoom } from './actions';
import socket from './socket';

const Rooms = () => {
	const dispatch = useDispatch();
	const { currentRoom, rooms } = useSelector((state) => state);
	const roomsData = Object.values(rooms);

	useEffect(() => {
		dispatch(getRooms());
		socket.on('addedNewRoom', () => {
			dispatch(getRooms());
		});
	}, []);

	return (
		<>
			{rooms && roomsData.length > 0 ? (
				<>
					<br />
					<h5>Existing rooms:</h5>
					<div style={{ width: '700px' }}>
						{roomsData.map((room) => (
							<button
								disabled={currentRoom && room.id === currentRoom.id}
								key={room.id}
								onClick={() => dispatch(joinRoom(room.id))}>
								Enter to {room.name}
							</button>
						))}
					</div>
				</>
			) : (
				<h5>No available rooms</h5>
			)}
		</>
	);
};

export default Rooms;
