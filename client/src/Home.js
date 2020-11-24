import React, { useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUsername } from './actions';
import ChatRoom from './ChatRoom';
import Rooms from './Rooms';
import AddRoom from './AddRoom';

const Home = () => {
	const { currentRoom, username } = useSelector((state) => state);
	const dispatch = useDispatch();

	const [inputValues, setInputValues] = useReducer(
		(state, changes) => ({ ...state, ...changes }),
		{
			error: '',
			username: '',
		}
	);

	const handleOnChange = (event) => {
		const { name, value } = event.target;
		setInputValues({ [name]: value });
	};

	const setName = () => {
		if (!inputValues.username) {
			setInputValues({ error: 'Name should not be empty' });
			return;
		}
		setInputValues({ error: '' });
		dispatch(setUsername(inputValues.username));
		localStorage.setItem('username', inputValues.username);
	};

	return (
		<>
			{!username && (
				<div className="user">
					<span>Enter your name before login in chat</span>
					<input
						type="text"
						placeholder="Enter username"
						value={inputValues.username}
						name="username"
						onChange={handleOnChange}
					/>
					<button onClick={setName}>Login in Chat</button>
					{inputValues.error ? (
						<blockquote>
							<p>
								<em>Error: {inputValues.error}</em>
							</p>
						</blockquote>
					) : null}
				</div>
			)}

			{username && !currentRoom && (
				<div className="createRoom">
					<AddRoom />
					<Rooms />
				</div>
			)}

			{username && currentRoom && (
				<>
					<ChatRoom />
					<Rooms />
				</>
			)}
		</>
	);
};

export default Home;
