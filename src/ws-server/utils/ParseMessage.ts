import {Message} from "../models/Message";
import {RawData} from "ws";

export const serializeMessage = (message: Message<object>): string => {
    console.log(`RESPONSE: ${message.type}: ${JSON.stringify(message.data)}`);

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

    console.log(`REQUEST: ${parsed.type}: ${JSON.stringify(parsed.data)}`);

    return parsed;
}