import { io } from 'socket.io-client';

const socket = io('http://localhost:4001');

// برای ارسال پیام
socket.emit('chatMessage', 'username', 'Hello, world!');

// برای دریافت پیام
socket.on('chatMessage', (from, msg) => {
    console.log(`Received message from ${from}: ${msg}`);
});
