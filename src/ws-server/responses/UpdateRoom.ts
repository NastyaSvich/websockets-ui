import {Message} from "../models/Message";
import {MessageType} from "../models/MessageType";
import {serializeMessage} from "../utils/ParseMessage";
import {Storage} from "../storage/Storage";
import {Server} from "ws";

export const updateRoom = (
    storage: Storage,
    server: Server
) => {
    const data = storage.rooms.getAvailableRooms();

    const response: Message<object> = {
        type: MessageType.UPDATE_ROOM,
        data,
        id: 0
    };

    server.clients.forEach((socket) => {
        if (socket.readyState === WebSocket.OPEN) {
            socket.send(serializeMessage(response));
        }
    });
};