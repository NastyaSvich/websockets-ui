import {Storage} from "../storage/Storage";
import {User} from "../models/User";
import {reg as regResponse} from "../responses/Reg";
import {updateWinners} from "../responses/UpdateWinners";
import {updateRoom} from "../responses/UpdateRoom";
import {ExtendedWebSocket} from "../models/ExtendedWebSocket";

export const reg = (data: unknown, storage: Storage, socket: ExtendedWebSocket): void => {
    const user = storage.users.reg(data as User);
    socket.userIndex = user.index;

    regResponse(user, socket);
    updateRoom(storage, socket);
    updateWinners(storage, socket);
};