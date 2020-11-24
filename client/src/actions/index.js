import * as actionTypes from './types';
import axios from 'axios';

// eslint-disable-next-line no-undef
//const PORT = process.env.REACT_APP_SERVER_PORT || 1234;
export const createRoomRequest = () => {
	return {
		type: actionTypes.CREATE_ROOM_REQUEST,
	};
};

export const createRoomSuccess = (room) => {
	return {
		type: actionTypes.CREATE_ROOM_SUCCESS,
		payload: { room },
	};
};

export const createRoomError = (error) => {
	return {
		type: actionTypes.CREATE_ROOM_ERROR,
		payload: { error },
	};
};

export const createRoom = (name) => async (dispatch) => {
	dispatch(createRoomRequest());
	try {
		const response = await axios.post(`/createRoom`, { name });
		dispatch(createRoomSuccess(response.data));
	} catch (error) {
		dispatch(createRoomError(error));
	}
};

//----------------------------------------

export const getRoomsRequest = () => {
	return {
		type: actionTypes.GET_ROOMS_REQUEST,
	};
};

export const getRoomsSuccess = (rooms) => {
	return {
		type: actionTypes.GET_ROOMS_SUCCESS,
		payload: { rooms },
	};
};

export const getRoomsError = (error) => {
	return {
		type: actionTypes.GET_ROOMS_ERROR,
		payload: { error },
	};
};

export const getRooms = () => async (dispatch) => {
	dispatch(getRoomsRequest());
	try {
		const response = await axios.get(`/rooms`);
		dispatch(getRoomsSuccess(response.data));
	} catch (error) {
		dispatch(getRoomsError(error));
	}
};

//-------------------------------------

export const joinRoomRequest = () => {
	return {
		type: actionTypes.JOIN_ROOM_REQUEST,
	};
};

export const joinRoomSuccess = (data) => {
	return {
		type: actionTypes.JOIN_ROOM_SUCCESS,
		payload: { ...data },
	};
};

export const joinRoomError = (error) => {
	return {
		type: actionTypes.JOIN_ROOM_ERROR,
		payload: { error },
	};
};

export const joinRoom = (roomId) => async (dispatch) => {
	dispatch(joinRoomRequest());
	try {
		const response = await axios.get(`/rooms/${roomId}`);
		dispatch(joinRoomSuccess(response.data));
	} catch (error) {
		dispatch(joinRoomError(error));
	}
};

//------------------------

export const setUsername = (username) => {
	return {
		type: actionTypes.SET_USERNAME,
		payload: { username },
	};
};

export const updateChatMessages = (update) => {
	return {
		type: actionTypes.UPDATE_CHAT_MESSAGES,
		payload: { ...update },
	};
};
