import crypto from "node:crypto";
import {Game as IGame} from "../models/Game";
import {Ship} from "../models/Ship";

export class Game {
    game: IGame;


    createGame = (playerOneId: string, playerTwoId: string): IGame => {
        this.game = {
            gameId: crypto.randomUUID(),
            players: [
                {index: playerOneId, ships: []},
                {index: playerTwoId, ships: []}
            ],
            playerTurnId: playerOneId,
        }
        return this.game;
    };

    addShips = (gameId: string, indexPlayer: string, ships: Ship[]) => {
        if (this.game.gameId === gameId) {
            this.game.players?.forEach(player => {
                if (player.index === indexPlayer) {
                    player.ships = ships;
                }
            })
        }
    }

    getPlayerShipsById = (playerId: string) => {
        return this.game.players.find(player => player.index === playerId)?.ships;
    }
}

