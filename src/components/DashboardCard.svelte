<script>
    import { Link } from "svelte-navigator";
    // import { getAllInvoices } from "../lib/db";

    // const currentMonthWords = new Date().toLocaleDateString("default", {
    //     month: "long",
    // });

    // async function getStats() {
    //     const invoices = await getAllInvoices();
    //     const currentMonthInt = new Date().getMonth();

    //     let unpaidInvoices = 0;
    //     let monthlySales = 0;

    //     unpaidInvoices = invoices.filter(
    //         (invoice) => !invoice.data.paid
    //     ).length;
    //     monthlySales = invoices
    //         .filter(
    //             (invoice) =>
    //                 new Date(invoice.data.dates.issued).getMonth() ===
    //                 currentMonthInt
    //         )
    //         .reduce((prev, curr) => prev.data.total + curr.data.total, 0);
    //     return { unpaidInvoices, monthlySales };
    // }
</script>

<header>
    <div class="title-bar">
        <h1 class="title">Invoices</h1>
        <Link to="/settings">
            <span
                class="material-symbols-outlined"
                style="color:rgb(31, 31, 31)"
            >
                settings
            </span>
        </Link>
    </div>

    <!-- {#await getStats()}
        <p>loading</p>
    {:then { unpaidInvoices, monthlySales }}
        <div class="body">
            <div class="stat">
                <h1>{monthlySales.toFixed(2)}</h1>

                <p>
                    {currentMonthWords} Sales
                </p>
            </div>

            <div class="stat">
                <h1>{unpaidInvoices}</h1>
                <p>Unpaid invoices</p>
            </div>
        </div>
    {:catch error}
        <p>Something went wrong</p>
        {console.log(error)}
    {/await} -->
</header>

<style>
    header {
        padding: 20px;
    }

    .title-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .title {
        font-weight: light;
    }

    /* .body {
        display: flex;
        justify-content: space-evenly;
        padding: 1rem;
        border-radius: 1rem;
        background-color: rgb(255, 255, 255, 0.2);
    }

    h1 {
        font-size: 1.5rem;
        margin-bottom: 15px;
    }

    p {
        font-size: 0.9rem;
        color: rgb(255, 255, 255, 0.75);
    }

    p,
    h1 {
        text-align: center;
    } */
</style>
