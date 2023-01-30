<script lang="ts">
	import { onMount } from 'svelte';
    import type { Chat } from '../api/data';
    import { chats, selectedChat } from '../api/data';
	import { fetchFriendChats } from '../api/friend';
	import { fetchGroupChats } from '../api/group';
	import { fetchMyself } from '../api/user';
	import ChatButton from '../components/ChatButton.svelte';

    function setChat(chat: Chat) {
        if ($selectedChat != chat)
            selectedChat.set(chat);
    }

    onMount(() => {
        fetchMyself().then(() => {
            fetchFriendChats().then(() => {
                fetchGroupChats();
            });
        });
    });
</script>

<nav>
    {#each $chats as chat}
        <ChatButton chat={chat} selected={chat == $selectedChat} on:click={() => setChat(chat)} />
    {/each}
</nav>

<main>
    <slot />
</main>

<style>
    nav {
        display: flex;
        flex-direction: column;

        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 16rem;

        background-color: #ff6347;
    }

    main {
        position: absolute;
        top: 0;
        left: 16rem;
        bottom: 0;
        right: 0;
        padding: 1.6rem;

        background-color: #ffffff;
    }
</style>