<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import type { Unsubscriber } from 'svelte/store';
    import { chats, user } from '../api/data';
	import { fetchFriendChats } from '../api/friend';
	import { fetchGroupChats } from '../api/group';
	import { fetchMyself } from '../api/user';

    let userUnsub: Unsubscriber | undefined;

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
        <p>{chat.name}</p>
    {/each}
</nav>

<main>
    <slot />
</main>

<style>
    nav {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 16rem;

        background-color: #263238;
    }

    main {
        position: absolute;
        top: 0;
        left: 16rem;
        bottom: 0;
        right: 0;

        background-color: #37474F;
    }
</style>