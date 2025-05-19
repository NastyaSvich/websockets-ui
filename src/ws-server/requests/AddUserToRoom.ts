import {Storage} from "../storage/Storage";
import {updateRoom} from "../responses/UpdateRoom";
import {ExtendedWebSocket} from "../models/ExtendedWebSocket";

export const addUserToRoom = (data: unknown, storage: Storage, socket: ExtendedWebSocket): void => {
    const roomInfo = data as { indexRoom: string };
    const user = storage.users.getByIndex(socket.userIndex!)

    if (user) {
        storage.rooms.addUserToRoom(roomInfo.indexRoom, {index: user.index, name: user.name});
    }

    updateRoom(storage, socket);
};