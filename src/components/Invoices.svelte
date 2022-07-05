<script>
    import InvoiceCard from "./InvoiceCard.svelte";
    import { createInvoicesLiveQuery } from "../lib/db";
    const invoices = createInvoicesLiveQuery();

    const dueFilterPredicate = (invoice) =>
        Date.now() > new Date(invoice.data.dates.due).getTime() &&
        !invoice.data.paid;

    const unpaidInvoicesPredicate = (invoice) =>
        Date.now() < new Date(invoice.data.dates.due).getTime() &&
        !invoice.data.paid;

    const paidInvoicePredicate = (invoice) => invoice.data.paid;

    let currency = "";
    const settings = localStorage.getItem("settings");
    if (settings) currency = JSON.parse(settings).currencySymbol;
</script>

<main>
    {#if $invoices}
        <!-- Invoices due -->
        <p class="heading">Due</p>
        {#each $invoices.filter(dueFilterPredicate) as invoice (invoice.id)}
            <InvoiceCard {invoice} {currency} />
        {/each}

        <!-- Invoices unpaid -->
        <p class="heading">Unpaid</p>
        {#each $invoices.filter(unpaidInvoicesPredicate) as invoice (invoice.id)}
            <InvoiceCard {invoice} {currency} />
        {/each}

        <!-- Invoices paid -->
        <p class="heading">Paid-up</p>
        {#each $invoices.filter(paidInvoicePredicate) as invoice (invoice.id)}
            <InvoiceCard {invoice} {currency} />
        {/each}
    {/if}
</main>

<style>
    main {
        padding: 10px;
    }

    .heading {
        text-transform: uppercase;
        color: gray;
        font-size: 0.7rem;
        letter-spacing: 1px;
    }
</style>
