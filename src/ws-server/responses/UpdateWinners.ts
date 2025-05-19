import {Message} from "../models/Message";
import {MessageType} from "../models/MessageType";
import {serializeMessage} from "../utils/ParseMessage";
import {Storage} from "../storage/Storage";
import {ExtendedWebSocket} from "../models/ExtendedWebSocket";

export const updateWinners = (storage: Storage, socket: ExtendedWebSocket) => {
    const data = storage.users.getAllWinners();

    const response: Message<object> = {
        type: MessageType.UPDATE_WINNERS,
        data,
        id: 0
    };

    socket.send(serializeMessage(response));
};