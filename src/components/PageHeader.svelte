<script>
    import { navigate } from "svelte-navigator";
    const back = () => navigate(-1);
    export let title;
</script>

<header>
    <span class="material-symbols-outlined" on:click={back}> arrow_back </span>
    <h1>{title}</h1>
</header>

<style>
    header {
        padding: 15px;
        display: flex;
        align-items: center;
    }

    h1 {
        color: rgb(58, 58, 58);
        margin-left: 20px;
    }
</style>
