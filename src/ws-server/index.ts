import {WebSocket, WebSocketServer} from 'ws';
import {handleMessage} from "./messages/HandleMessage";
import {deserializeMessage} from "./utils/ParseMessage";
import {storage} from "./storage/Storage";

export const wsServer = (port: number) => {

    const server = new WebSocketServer({ port, clientTracking: true });

    server.on('connection', (socket: WebSocket) => {
        console.log(`Join player. Players in session ${server.clients.size}`);

        socket.on('message', (data) => {
            try {
                const message = deserializeMessage(data);
                handleMessage(server, socket, message, storage);
            } catch (error) {
                console.error("Error while connecting to websocket server", error);
            }
        });

        socket.on('error', (error) => {
            console.error("Error while connecting to websocket server", error);
        })

        socket.on('close', () => {
            console.log(`Player exit. Players in session ${server.clients.size}`);
        });
    });
}
