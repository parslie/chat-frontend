<script lang="ts">
	import type { Message } from '../api/data';

    export let msg: Message;
    export let isIncoming: boolean;
    export let displayAuthor: boolean;
</script>

<div>
    <div class="message {isIncoming ? 'incoming' : 'outgoing'}">
        {#if displayAuthor}
            <h4>{msg.author.username}</h4>
        {/if}
        <p>{msg.content}</p>
    </div>
</div>

<style>
    .message {
        padding: 0.4rem;
        border-radius: 0.4rem;
    }

    .incoming {
        float: left;
        background-color: #00bfff;
    }

    .outgoing {
        float: right;
        background-color: #d3d3d3;
    }

    h4 {
        margin: 0 0 0.4rem;
    }

    p {
        margin: 0;
    }
</style>