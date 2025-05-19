import {Storage} from "../storage/Storage";
import {updateRoom} from "../responses/UpdateRoom";
import {ExtendedWebSocket} from "../models/ExtendedWebSocket";

export const createRoom = (_data: unknown, storage: Storage, socket: ExtendedWebSocket): void => {
    const room = storage.rooms.createRoom();
    const user = storage.users.getByIndex(socket.userIndex!)

    if (user) {
        storage.rooms.addUserToRoom(room.roomId, {index: user.index, name: user.name});
    }

    updateRoom(storage, socket);
};