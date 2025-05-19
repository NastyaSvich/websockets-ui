import {Message} from "../models/Message";
import {MessageType} from "../models/MessageType";
import {serializeMessage} from "../utils/ParseMessage";
import {Storage} from "../storage/Storage";
import {ExtendedWebSocket} from "../models/ExtendedWebSocket";

export const updateRoom = (storage: Storage, socket: ExtendedWebSocket) => {
    const data = storage.rooms.getAvailableRooms();

    const response: Message<object> = {
        type: MessageType.UPDATE_ROOM,
        data,
        id: 0
    };

    socket.send(serializeMessage(response));
};