import {Message} from "../models/Message";
import {MessageType} from "../models/MessageType";
import {serializeMessage} from "../utils/ParseMessage";
import {Storage} from "../storage/Storage";
import {ExtendedWebSocket} from "../models/ExtendedWebSocket";

export const finish = (
    _storage: Storage,
    socket: ExtendedWebSocket
) => {
    const response: Message<object> = {
        type: MessageType.FINISH,
        data: {
            winPlayer: socket.userIndex
        },
        id: 0
    };
    socket.send(serializeMessage(response));
};