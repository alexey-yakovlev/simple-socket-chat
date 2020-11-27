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
				<div className="container" style={{ marginTop: '10%' }}>
					<div className="row">
						<div className="column column-50 column-offset-25 ">
							<span>Enter your name</span>
							<input
								type="text"
								placeholder="Input user name"
								value={inputValues.username}
								name="username"
								onChange={handleOnChange}
							/>
						</div>
					</div>
					<div className="row">
						<div className="column column-50 column-offset-25">
							<button onClick={setName}>Login in Chat</button>
							{inputValues.error ? (
								<blockquote>
									<p>
										<em>Error: {inputValues.error}</em>
									</p>
								</blockquote>
							) : null}
						</div>
					</div>
				</div>
			)}

			{username && !currentRoom && (
				<div className="container" style={{ marginTop: '10%' }}>
					<AddRoom />
					<div className="row">
						<div className="column column-50 column-offset-25">
							<Rooms />
						</div>
					</div>
				</div>
			)}

			{username && currentRoom && (
				<div className="container">
					<ChatRoom />
					<div className="row">
						<div className="column column-50">
							<Rooms />
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Home;
