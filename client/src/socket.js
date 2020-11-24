/* eslint-disable no-undef */
import sio from 'socket.io-client';
import { HOST, PORT } from './config';
const socket = sio.connect(`${HOST}:${PORT}`, { secure: true });
export default socket;
