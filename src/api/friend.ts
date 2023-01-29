import { friendChats, type Chat, ChatType } from './data';
import request from './request';

export async function fetchFriendChats() {
    return request.get(
        '/chat/friend/',
    ).then((resp) => {
        let chats = resp.data.map((chat: Chat) => {
            chat.type = ChatType.Friend;
            return chat;
        });

        friendChats.set(chats);
    });
}