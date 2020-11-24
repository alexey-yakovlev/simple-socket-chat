/* eslint-disable no-undef */
import React, { useReducer, useEffect } from 'react';
import sio from 'socket.io-client';
import { HOST, PORT } from './config';
import { useSelector, useDispatch } from 'react-redux';
import { updateChatMessages } from './actions';
import socket from './socket';

const ChatRoom = () => {
	const { currentRoom, username, currentRoomMessages } = useSelector((state) => state);
	const dispatch = useDispatch();

	const [inputValues, setInputValues] = useReducer(
		(state, changes) => ({ ...state, ...changes }),
		{
			error: '',
			textMessage: '',
		}
	);

	const handleOnChange = (event) => {
		const { name, value } = event.target;
		setInputValues({ [name]: value });
	};

	const submitMessage = (e) => {
		e.preventDefault();
		if (inputValues.textMessage === '') {
			setInputValues({ error: 'Message should not be null' });
			return;
		}
		setInputValues({ error: '' });
		const payload = {
			roomId: currentRoom.id,
			message: {
				username,
				text: inputValues.textMessage,
			},
		};
		setInputValues({ textMessage: '' });
		socket.emit('send-message-server', payload);
	};

	useEffect(() => {
		const socket = sio.connect(`${HOST}:${PORT}`, { secure: true });
		socket.on('get-message-server', (data) => {
			if (data.roomId === currentRoom.id) {
				dispatch(updateChatMessages(data));
			}
		});
		return () => socket.disconnect();
	}, [currentRoom.id]);

	return (
		<div>
			<h4>
				ROOM: <strong>{currentRoom.name}</strong>
			</h4>
			{username && (
				<>
					<div id="chatRoom" className="row">
						<form className="column column-80">
							<fieldset>
								<div
									className="history"
									style={{
										width: '600px',
										border: '1px solid #ccc',
										height: '200px',
										textAlign: 'left',
										padding: '10px',
										overflow: 'scroll',
									}}>
									{currentRoomMessages.map((message, index) => (
										<div key={index}>
											<i>{message.username}:</i> {message.text}
										</div>
									))}
								</div>
								<br />
								<div className="control">
									<input
										type="text"
										value={inputValues.textMessage}
										name="textMessage"
										onChange={handleOnChange}
									/>
									<button type="submit" onClick={submitMessage}>
										Send
									</button>
								</div>
								{inputValues.error ? (
									<blockquote>
										<p>
											<em>Error: {inputValues.error}</em>
										</p>
									</blockquote>
								) : null}
							</fieldset>
						</form>
					</div>
				</>
			)}
		</div>
	);
};

export default ChatRoom;
