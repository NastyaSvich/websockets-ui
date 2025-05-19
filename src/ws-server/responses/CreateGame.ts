import {Message} from "../models/Message";
import {MessageType} from "../models/MessageType";
import {serializeMessage} from "../utils/ParseMessage";
import {Storage} from "../storage/Storage";
import {Server} from "ws";
import {ExtendedWebSocket} from "../models/ExtendedWebSocket";

export const createGame = (
    playerOneId: string,
    playerTwoId: string,
    storage: Storage,
    server: Server
) => {
    const data = storage.game.createGame(playerOneId, playerTwoId);

    server.clients.forEach((socket: ExtendedWebSocket) => {
        if (socket.readyState === WebSocket.OPEN &&
            (socket.userIndex === playerOneId || socket.userIndex === playerTwoId)) {
            const response: Message<object> = {
                type: MessageType.CREATE_GAME,
                data: {idGame: data.gameId, idPlayer: socket.userIndex},
                id: 0
            };
            socket.send(serializeMessage(response));
        }
    });
};