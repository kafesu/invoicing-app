<script>
    import DeleteConfirmationModal from "./DeleteConfirmationModal.svelte";

    export let id, paid, save;
    let showDeleteModal = false;

    const askToDelete = () => {
        showDeleteModal = true;
    };
</script>

<div>
    <input type="checkbox" bind:checked={paid} id="paid" />
    &nbsp
    <label for="paid">Mark invoice as paid</label>
</div>
<button class="primary" on:click={save}>Save</button>
<button class="danger" on:click={askToDelete}>Delete</button>
<DeleteConfirmationModal {id} bind:showModal={showDeleteModal} />

<style>
    div {
        display: flex;
        align-items: top;
        justify-content: left;
    }

    input {
        width: auto;
    }
</style>
