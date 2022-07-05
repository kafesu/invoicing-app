<script>
    import { v4 as uuid } from "uuid";

    export let items = {};
    export let total = 0;

    let currency;
    const settings = localStorage.getItem("settings");
    if (settings) currency = JSON.parse(settings).currencySymbol;

    const addItem = () => {
        items = Object.assign(items, {
            [uuid()]: { qty: 0, desc: "", rate: 0 },
        });
    };

    const deleteItem = (key) => {
        delete items[key];
        items = items;
    };

    $: total = Object.entries(items)
        .map(([key, value]) => value.rate * value.qty)
        .reduce((prev, curr) => prev + curr, 0);
</script>

<table>
    <thead>
        <tr>
            <th>Qty</th>
            <th>Description</th>
            <th>Rate ({currency})</th>
            <th>Total ({currency})</th>
            <th />
        </tr>
    </thead>
    <tbody>
        {#each Object.entries(items) as [key, item] (key)}
            <tr>
                <td contenteditable="true" bind:textContent={item.qty} />
                <td contenteditable="true" bind:textContent={item.desc} />
                <td contenteditable="true" bind:textContent={item.rate} />
                <td>{(item.rate * item.qty).toFixed(2)}</td>
                <td on:click={() => deleteItem(key)}>
                    <span style="color: gray" class="material-symbols-outlined">
                        delete
                    </span>
                </td>
            </tr>
        {/each}
    </tbody>
    <tfoot>
        <tr>
            <td colspan="3"><strong>Total</strong></td>
            <td colspan="2">{total.toFixed(2)}</td>
        </tr>
        <tr>
            <td class="add-item" colspan="5" on:click={addItem}>Add Item</td>
        </tr>
    </tfoot>
</table>

<style>
    table {
        overflow-x: scroll;
        border-radius: 50px;
        margin-bottom: 40px;
        border: 1px solid rgb(202, 202, 202);
        border-collapse: collapse;
    }

    td {
        border: 1px solid rgb(201, 201, 201);
        border-collapse: collapse;
        background-color: white;
        padding: 10px 5px;
        font-size: 0.8rem;
    }

    th {
        color: white;
        font-weight: light;
        background-color: rgb(31, 31, 31);
        padding: 10px 5px;
        font-size: 0.8rem;
    }

    .add-item {
        text-align: center;
        color: rgb(81, 79, 184);
        background-color: white;
        border: none;
        font-weight: bold;
        font-size: 0.9rem;
    }
</style>
