<script>
    import { navigate } from "svelte-navigator";
    import { formatId } from "../lib/formatId";
    import { deleteInvoice } from "../lib/db.js";

    export let id, showModal;

    const confirmDelete = async () => {
        await deleteInvoice(id);
        navigate(-1);
    };

    const closeModal = () => {
        showModal = false;
    };

    const attemptClose = (e) => {
        if (e.target.id === "container") {
            closeModal();
        }
    };
</script>

<div
    id="container"
    class="container"
    style="display: {showModal ? '' : 'none'};"
    on:click={attemptClose}
>
    <div id="delete-modal">
        <p>Are you sure you want to delete invoice {formatId(id)}?</p>
        <div class="actions">
            <button class="cancel" on:click={closeModal}>Cancel</button>
            <button class="danger" on:click={confirmDelete}>Delete</button>
        </div>
    </div>
</div>

<style>
    .actions {
        display: flex;
        justify-content: end;
    }

    .container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.85);
    }

    #delete-modal {
        background-color: white;
        border-radius: 5px;
        max-width: 300px;
        padding: 30px;
    }

    p {
        margin-bottom: 30px;
    }

    button {
        background-color: white;
        margin: 0px 10px;
        font-weight: bold;
    }
</style>
