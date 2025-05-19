import {Users} from "./Users";
import {Rooms} from "./Rooms";
import {Game} from "./Game";

export type Storage = {
    users: Users;
    rooms: Rooms;
    game: Game;
};

export const storage: Storage = {
    users: new Users(),
    rooms: new Rooms(),
    game: new Game(),
};