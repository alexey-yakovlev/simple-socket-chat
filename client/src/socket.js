import sio from 'socket.io-client';
// eslint-disable-next-line no-undef
const PORT = process.env.REACT_APP_PORT || process.env.PORT || 1234;
const socket = sio(`http://localhost:${PORT}`);
export default socket;
