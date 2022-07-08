<script>
    import { dueFilterPredicate, unpaidInvoicesPredicate, paidInvoicesPredicate } from "../lib/invoiceFilters";
    import { createInvoicesLiveQuery } from "../lib/db";
    import InvoiceCard from "./InvoiceCard.svelte";
    const invoices = createInvoicesLiveQuery();

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
        {#each $invoices.filter(paidInvoicesPredicate) as invoice (invoice.id)}
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
