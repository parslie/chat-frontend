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

export async function fetchGroupMsgs(id: number, page: number = 1) {
    return request.get(
        `/chat/group/${id}/msg/page/${page}/`
    );
}