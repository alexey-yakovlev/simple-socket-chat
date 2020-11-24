/* eslint-disable no-undef */
import sio from 'socket.io-client';
import { HOST, PORT } from './config';
const socket = sio(`${HOST}:${PORT}`);
export default socket;
