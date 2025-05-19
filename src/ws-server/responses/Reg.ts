import {User} from "../models/User";
import {MessageType} from "../models/MessageType";
import {serializeMessage} from "../utils/ParseMessage";
import {Message} from "../models/Message";
import {RegResponse} from "../models/RegResponse";
import {ExtendedWebSocket} from "../models/ExtendedWebSocket";

export const reg = (user: User, socket: ExtendedWebSocket): void => {
    const data: RegResponse = {
        index: user.index,
        name: user.name,
        error: false,
        errorText: '',
    };

    const response: Message<RegResponse> = {
        type: MessageType.REG,
        data,
        id: 0
    };

    socket.send(serializeMessage(response));
};