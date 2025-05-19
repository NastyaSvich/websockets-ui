import {MessageType} from "./MessageType";

export interface Message<T> {
    type: MessageType;
    data: T;
    id: 0;
}