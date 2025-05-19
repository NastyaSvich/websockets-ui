import {Storage} from "../storage/Storage";
import {ExtendedWebSocket} from "../models/ExtendedWebSocket";
import {Server} from "ws";
import {Ship} from "../models/Ship";
import {startGame} from "../responses/StartGame";
import {turn} from "../responses/Turn";

export const addShips = (
    data: unknown,
    storage: Storage,
    _socket: ExtendedWebSocket,
    server: Server
): void => {
    const game = data as { gameId: string, ships: Ship[], indexPlayer: string };
    storage.game.addShips(game.gameId, game.indexPlayer, game.ships);

    if (storage.game.game.players.every(player => !!player.ships.length)) {
        const playerOneId = storage.game.game.players[0]!.index;
        const playerTwoId = storage.game.game.players[1]!.index;
        startGame(playerOneId, playerTwoId, storage, server);
        turn(playerOneId, playerTwoId, storage, server);
    }
};