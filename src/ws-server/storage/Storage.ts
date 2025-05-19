import {Users} from "./Users";
import {Rooms} from "./Rooms";
import {Games} from "./Games";

export type Storage = {
    users: Users;
    rooms: Rooms;
    games: Games;
};

export const storage: Storage = {
    users: new Users(),
    rooms: new Rooms(),
    games: new Games(),
};