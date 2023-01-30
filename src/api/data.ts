type User = {
    id: number;
    username: string;
};

enum ChatType {
    Friend,
    Group
};

type Chat = {
    id: number;
    name: string;
    members: User[];
    date_updated: string;
    date_created: string;
    type?: ChatType;
};

type Message = {
    id: number;
    author: User;
    content: string;
    date_created: string;
};

export { type User, ChatType, type Chat, type Message };

import { get, readable, writable, type Readable, type Writable } from "svelte/store";

export const user: Writable<User | null> = writable(null);
export const friendChats: Writable<Chat[]> = writable([]);
export const groupChats: Writable<Chat[]> = writable([]);

// TODO: test if this readable store works
export const chats: Readable<Chat[]> = readable([] as Chat[], (set) => {
    const orderChats = () => {
        let newChats = get(friendChats);

        get(groupChats).forEach((chat) => {
            for (let i = 0; i < newChats.length; i++) {
                if (new Date(chat.date_updated) >= new Date(newChats[i].date_updated) || i === newChats.length - 1) {
                    newChats.splice(i, 0, chat);
                    break;
                }
            }
        });

        set(newChats);
    };
    
    // TODO: analyze potential race conditions
    const unsubFriend = friendChats.subscribe(orderChats);
    const unsubGroup = groupChats.subscribe(orderChats);

    return () => {
        unsubFriend();
        unsubGroup();
    };
});

export const selectedGroup: Writable<Chat | null> = writable(null);