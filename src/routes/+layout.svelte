<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import type { Unsubscriber } from 'svelte/store';
    import { chats, user, type Chat, selectedGroup } from '../api/data';
	import { fetchFriendChats } from '../api/friend';
	import { fetchGroupChats, fetchGroupMsgs } from '../api/group';
	import { fetchMyself } from '../api/user';
	import ChatButton from '../components/ChatButton.svelte';

    let userUnsub: Unsubscriber | undefined;

    function setChat(chat: Chat) {
        if ($selectedGroup != chat)
            selectedGroup.set(chat);
    }

    onMount(() => {
        fetchMyself();

        userUnsub = user.subscribe(async value => {
            await fetchFriendChats();
            fetchGroupChats();
        });
    });

    onDestroy(() => {
        if (userUnsub !== undefined)
            userUnsub();
    });
</script>

<nav>
    {#each $chats as chat}
        <ChatButton chat={chat} selected={chat == $selectedGroup} on:click={() => setChat(chat)} />
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

        background-color: #ffffff;
    }
</style>