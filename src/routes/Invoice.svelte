<script>
    import CustomerDetails from "../components/CustomerDetails.svelte";
    import InvoiceActions from "../components/InvoiceActions.svelte";
    import InvoiceItems from "../components/InvoiceItems.svelte";
    import PageHeader from "../components/PageHeader.svelte";
    import DateInputs from "../components/DateInputs.svelte";

    import { saveInvoice, getInvoice } from "../lib/db";
    import { formatId } from "../lib/formatId";

    import { useParams, navigate } from "svelte-navigator";

    const params = useParams();
    const { id } = $params;

    let invoiceData = {};

    const init = async () => {
        try {
            invoiceData = await getInvoice(id);
        } catch (e) {
            throw e;
        }
    };

    const save = async () => {
        await saveInvoice(id, invoiceData);
        navigate(-1);
    };
</script>

<PageHeader title={`Invoice ${formatId(id)}`} />
{#await init()}
    <p>Loading data</p>
{:then}
    <main>
        <DateInputs bind:dates={invoiceData.dates} />
        <CustomerDetails bind:customerDetails={invoiceData.customer} />
        <InvoiceItems
            bind:total={invoiceData.total}
            bind:items={invoiceData.items}
        />
        <InvoiceActions bind:paid={invoiceData.paid} {id} {save} />
    </main>
{:catch error}
    <p>{error}</p>
{/await}

<style>
    main {
        display: flex;
        flex-direction: column;
        padding: 20px;
    }
</style>
