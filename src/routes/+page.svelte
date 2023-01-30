<script lang="ts">
	import type { AxiosResponse } from 'axios';
	import { onMount } from 'svelte';
	import { ChatType, selectedChat, user, type Chat, type Message } from '../api/data';
	import { fetchFriendMsgs } from '../api/friend';
	import { fetchGroupMsgs } from '../api/group';
	import ChatMessage from '../components/ChatMessage.svelte';

    let chat: Chat;
    let chatMsgs: Message[] = [];
    let chatPage: number = 1;

    function fetchCurrentPage() {
        let onSuccess = (resp: AxiosResponse) => {
            if (chatPage === 1) {
                chatMsgs = resp.data;
            } else {
                chatMsgs.push(...resp.data);
            }
            chatPage += 1;
        };

        if (chat.type === ChatType.Group) {
            fetchGroupMsgs(chat.id, chatPage).then(onSuccess);
        } else {
            fetchFriendMsgs(chat.id, chatPage).then(onSuccess);
        }
    }

    onMount(() => {
        selectedChat.subscribe(newChat => {
            if (newChat !== null) {
                chat = newChat;
                chatPage = 1;
                fetchCurrentPage();
            }
        });
    });
</script>

<div>
    {#each chatMsgs as msg, i}
        {#if $user !== null}
            <ChatMessage msg={msg} isIncoming={msg.author.id !== $user.id} 
                displayAuthor={i === 0 || chatMsgs[i - 1].author.id !== msg.author.id} />
        {/if}
    {/each}
</div>

<style>
    div {
        display: flex;
        flex-direction: column-reverse;
        gap: 0.4rem;
    }
</style>