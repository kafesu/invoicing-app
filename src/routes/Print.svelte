<script>
    import { afterUpdate } from "svelte";
    import { navigate, useParams } from "svelte-navigator";
    import { getInvoice } from "../lib/db";
    import { formatId } from "../lib/formatId";
    import { onMount } from "svelte";

    const params = useParams();
    const { id } = $params;
    
    let invoiceData, settings;

    onMount(async () => {
        // Getting settings from localStorage
        settings = JSON.parse(localStorage.getItem("settings"));

        // Getting invoice data using id
        invoiceData = await getInvoice(id);
    })

    let print = false;
    afterUpdate(() => {
        if (print) { 
            window.print();
        } 
        else { 
            print = true;
        }
    })

    window.onafterprint = () => navigate("/invoice/" + id)
</script>

{#if settings && invoiceData}
    <header>
        <h1>Invoice</h1>
        <div class="business">
            <p>Bill from:</p>
            <strong>{settings.businessName}</strong>
            <br>
            <span>
                { @html settings.businessDetails }
            </span>
        </div>
    </header>
    <main>
        <div class="data">
            <p>
                Invoice Number: {formatId(id)}
            </p>
            <p>
                Issued Date: {invoiceData.dates.issued}
            </p>
            <p>
                Due date: {invoiceData.dates.due}
            </p>
        </div>
        <br>
        <div class="customer">
            <p>Bill to:</p>
            <strong>{invoiceData.customer.name}</strong>
            <br>
            <span>
                { @html invoiceData.customer.details }
            </span>
        </div>
        <br>

        <table>
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Rate ({ settings.currencySymbol })</th>
                    <th>Total ({ settings.currencySymbol })</th>
                </tr>
            </thead>
            <tbody>
                {#each Object.entries(invoiceData.items) as [_, item]}
                    <tr>
                        <td>
                            { item.desc }
                        </td>
                        <td>
                            { item.qty }
                        </td>
                        <td>
                            { Number(item.rate).toFixed(2) }
                        </td>
                        <td>{ (Number(item.rate) * Number(item.qty)).toFixed(2) }</td>
                    </tr>
                {/each}
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="3"><strong>Grand Total</strong></td>
                    <td><strong>{ Number(invoiceData.total).toFixed(2) }</strong></td>
                </tr>
            </tfoot>
        </table>
        <br>
        
        <div class="notes">
            { @html settings.defaultNotes }
        </div>
    </main>
{:else}
    <p>Loading</p>
{/if}
<style>
    * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

header {
    padding: 20px 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

h1 {
    text-transform: uppercase;
}

main {
    padding: 50px
}

.data {
    display: flex;
    justify-content: space-between;
}

table, tr, td, th {
    border: 1px solid rgb(187, 187, 187);
    border-collapse: collapse;
}

table {
    width: 100%
}

th, td {
    padding: 10px;
}

</style>
