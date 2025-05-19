import {User} from "./User";

export interface RegResponse extends Pick<User, "index" | "name"> {
    error: boolean;
    errorText: string;
}