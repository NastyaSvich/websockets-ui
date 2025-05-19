import {Message} from "../models/Message";
import {MessageType} from "../models/MessageType";
import {serializeMessage} from "../utils/ParseMessage";
import {Storage} from "../storage/Storage";
import {Server} from "ws";
import {ExtendedWebSocket} from "../models/ExtendedWebSocket";

export const turn = (
    playerOneId: string,
    playerTwoId: string,
    storage: Storage,
    server: Server
) => {
    const playerTurnId = storage.game.game.playerTurnId;

    server.clients.forEach((socket: ExtendedWebSocket) => {
        if (socket.readyState === WebSocket.OPEN &&
            (socket.userIndex === playerOneId || socket.userIndex === playerTwoId)) {
            const response: Message<object> = {
                type: MessageType.TURN,
                data: {
                    currentPlayer: playerTurnId,
                },
                id: 0
            };
            socket.send(serializeMessage(response));
        }
    });

    if (playerTurnId === playerOneId) {
        storage.game.game.playerTurnId = playerTwoId
    } else {
        storage.game.game.playerTurnId = playerOneId;
    }
};