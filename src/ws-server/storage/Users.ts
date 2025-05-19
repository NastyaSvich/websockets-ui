import {User} from "../models/User";
import * as crypto from "node:crypto";
import {Winner} from "../models/Winner";

export class Users {
    users: User[] = [];

    reg(user: Omit<User, "index" | "score">): User {
        const {name, password} = user;
        const newUser: User = {index: crypto.randomUUID(), name, password, score: 0};
        this.users.push(newUser);

        return newUser;
    }

    getByIndex(index: string): User | undefined {
        const user = this.users.find((user) => user.index === index);
        return user ? user : undefined;
    }

    getAllWinners = (): Winner[] => {
        const winners: Winner[] = [];
        this.users.forEach((user: User) => {
            if (user.score > 0) {
                winners.push({name: user.name, wins: user.score});
            }
        });

        winners.sort((a, b) => {
            return b.wins - a.wins;
        });

        return winners;
    };
}

