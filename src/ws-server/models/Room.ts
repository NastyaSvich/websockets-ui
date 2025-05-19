import {User} from "./User";

export interface Room {
    roomId: string;
    roomUsers: Array<Pick<User, "index" | "name">>;
}