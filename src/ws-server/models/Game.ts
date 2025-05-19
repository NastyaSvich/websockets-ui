import {Ship} from "./Ship";

export interface Game {
    gameId: string;
    players: Player[];
    playerTurnId: string;
}

export interface Player {
    index: string;
    ships: Ship[];
}