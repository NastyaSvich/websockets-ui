import {Message} from "../models/Message";
import {RawData} from "ws";

export const serializeMessage = (message: Message<object>): string => {
    return JSON.stringify({
        ...message,
        data: JSON.stringify(message.data),
    });
};

export const deserializeMessage = (message: RawData): Message<object> => {
    const parsed = JSON.parse(message.toString());

    if (parsed.data.length && typeof parsed.data === "string") {
        parsed.data = JSON.parse(parsed.data);
    }

    return parsed;
}