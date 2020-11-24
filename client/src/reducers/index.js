import * as actionTypes from '../actions/types';

const initState = {
	rooms: [],
	currentRoom: null,
	currentRoomMessages: [],
	username: localStorage.getItem('username'),
};

const chat = (state = initState, action) => {
	switch (action.type) {
		case actionTypes.CREATE_ROOM_SUCCESS:
			return {
				...state,
				currentRoom: action.payload.room,
			};

		case actionTypes.GET_ROOMS_SUCCESS:
			return {
				...state,
				rooms: action.payload.rooms,
			};

		case actionTypes.JOIN_ROOM_SUCCESS:
			return {
				...state,
				...action.payload,
			};

		case actionTypes.SET_USERNAME:
			return {
				...state,
				username: action.payload.username,
			};

		case actionTypes.UPDATE_CHAT_MESSAGES:
			if (action.payload.roomId === state.currentRoom.id) {
				return {
					...state,
					currentRoomMessages: [...state.currentRoomMessages, action.payload.message],
				};
			}
			break;

		default:
			return state;
	}
};

export default chat;
