import { WebSocketServer, WebSocket } from 'ws';

export const wsServer = (port: number) => {

    const server = new WebSocketServer({ port, clientTracking: true });

    server.on('connection', (socket: WebSocket) => {
        socket.on('error', console.error);

        socket.on('message', (data) => {
            console.log('message', data);
        });

        socket.on('close', (data) => {
            console.log('close', data);
        });
    });

    server.on('listening', () => {
        console.log('listening');
    });
}