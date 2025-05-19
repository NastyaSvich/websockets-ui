import {Storage} from "../storage/Storage";
import {updateRoom} from "../responses/UpdateRoom";
import {ExtendedWebSocket} from "../models/ExtendedWebSocket";
import {Server} from "ws";
import {createGame} from "../responses/CreateGame";

export const addUserToRoom = (
    data: unknown,
    storage: Storage,
    socket: ExtendedWebSocket,
    server: Server
): void => {
    const roomInfo = data as { indexRoom: string };
    const user = storage.users.getByIndex(socket.userIndex!)

    if (user) {
        // Do not add user to the room twice
        if (storage.rooms.getRoomById(roomInfo.indexRoom)?.roomUsers.some(cur =>
            cur.index === user.index)) {
            console.error(`User with id ${user.index} is already in the room`);
        } else {
            const room = storage.rooms.addUserToRoom(roomInfo.indexRoom, {index: user.index, name: user.name});
            if (room && room.roomUsers && room.roomUsers.length === 2) {
                updateRoom(storage, server);
                createGame(room.roomUsers[0]!.index, room.roomUsers[1]!.index, storage, server);
            } else {
                updateRoom(storage, server);
            }
        }
    }
};