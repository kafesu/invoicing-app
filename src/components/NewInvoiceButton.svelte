<script>
    import { navigate } from "svelte-navigator";
    import { newInvoice } from "../lib/db";

    async function createNewInvoice() {
        const id = await newInvoice();
        navigate("/invoice/" + id);
    }
</script>

<button on:click={createNewInvoice} class="primary">
    <span class="material-symbols-outlined"> edit </span>
    <span class="label">New Invoice</span>
</button>

<style>
    button {
        border: none;
        padding: 10px 15px;
        border-radius: 1.5rem;
        position: fixed;
        bottom: 40px;
        right: 20px;
        display: flex;
        align-items: center;
    }

    .label {
        font-size: 0.9rem;
        margin-left: 10px;
    }
</style>
