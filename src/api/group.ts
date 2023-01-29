import { groupChats, type Chat, ChatType } from './data';
import request from './request';

export async function fetchGroupChats() {
    return request.get(
        '/chat/group/',
    ).then((resp) => {
        let chats = resp.data.map((chat: Chat) => {
            chat.type = ChatType.Group;
            return chat;
        });

        groupChats.set(chats);
    });
}