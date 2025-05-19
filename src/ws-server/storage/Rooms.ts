import {Room} from "../models/Room";
import crypto from "node:crypto";
import {User} from "../models/User";

export class Rooms {
    rooms: Room[] = [];

    createRoom = (): Room => {
        const newRoom: Room = {roomId: crypto.randomUUID(), roomUsers: []};
        this.rooms.push(newRoom);

        return newRoom;
    };

    getAvailableRooms = (): Room[] => {
        const result: Room[] = [];
        this.rooms.forEach((room: Room) => {
            if (room.roomUsers.length === 1) {
                result.push(room);
            }
        });

        return result;
    };

    addUserToRoom = (roomId: string, user: Pick<User, "index" | "name">): void => {
        const result = this.getRoomById(roomId);
        if (result) {
            result.roomUsers.push(user);
        }

        return;
    };

    getRoomById = (id: string): Room | undefined => {
        const room = this.rooms.find((room) => room.roomId === id);
        return room ? room : undefined;
    };
}

