<script lang="ts">
	import type { Chat } from "../api/data";
    import { ChatType } from "../api/data";

    export let chat: Chat;
    export let selected: boolean;
</script>

<button class:selected on:click>
    <h3>{chat.name}</h3>
    <h4>
        {#if chat.type === ChatType.Group}
            {chat.members.length} members
        {:else}
            &nbsp;
        {/if}
    </h4>
</button>

<style>
    button {
        display: block;
        
        padding: 0.4rem;
        border: none;

        background-color: #ff6347; 
        text-align: left;
        cursor: pointer;
    }

    button:hover {
        background-color: #d3472f;
    }

    button.selected {
        background-color: #ffffff;
    }

    h3, h4 {
        margin: 0;
    }                
</style>