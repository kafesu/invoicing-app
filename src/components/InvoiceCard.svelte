<script>
    import { navigate } from "svelte-navigator";
    import { formatId } from "../lib/formatId";
    import dayjs from "dayjs";

    export let invoice, currency;

    const edit = () => navigate("/invoice/" + invoice.id);
    const formattedIssuedDate = dayjs(invoice.data.dates.issued).format(
        "D MMM YYYY"
    );
    const isDue = Date.now() > dayjs(invoice.data.dates.due).valueOf();
</script>

<div class="card" on:click={edit}>
    <div class="top">
        <p>{invoice.data.customer.name || "No name"}</p>
        <p class="invoice-total">{currency} {invoice.data.total.toFixed(2)}</p>
    </div>
    <div class="bottom">
        <span class="id">{formatId(invoice.id)}</span>
        <span class="date">{formattedIssuedDate}</span>
    </div>
    <!-- <p class="status">
        {#if invoice.data.paid}
            Paid up
        {:else if isDue}
            Due for payment
        {:else}
            Waiting for payment
        {/if}
    </p> -->
</div>

<style>
    .card {
        padding: 20px;
        background-color: white;
        margin: 10px 0px;
        border-radius: 5px;
        /* border: 1px solid rgb(228, 228, 228); */
        color: rgb(31, 31, 31);
        text-decoration: none;
    }

    .top {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        font-size: 0.9rem;
        margin-bottom: 15px;
    }

    .bottom {
        color: gray;
        font-size: 0.7rem;
        display: flex;
        justify-content: space-between;
    }

    /* .status {
        color: rgb(50, 124, 50);
    } */
</style>
