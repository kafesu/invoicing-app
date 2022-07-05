export default `
<div>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;400;500&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Poppins', sans-serif;
        }

        header {
            padding: 20px 50px;
            background-color: rgb(78, 57, 172);
            color: white;
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

        table, tr, td {
            border: 1px solid rgb(187, 187, 187);
            border-collapse: collapse;
        }

        table {
            width: 100%
        }

        th {
            background: rgb(78, 57, 172);
            color: white;
            padding: 10px;
        }

        td {
            padding: 10px
        }
    </style>
    <header>
        <h1>Invoice</h1>
        <div class="business">
            <p>Bill from:</p>
            <strong>{{ businessName }}/strong>
            <br>
            <span>
                {{ businessDetails }}
            </span>
        </div>
    </header>
    <main>
        <div class="data">
            <p>
                Invoice Number: {{ id }}
            </p>
            <p>
                Issued Date: {{ dates.issued }}
            </p>
            <p>
                Due date: {{ dates.due }}
            </p>
        </div>
        <br>
        <div class="customer">
            <p>Bill to:</p>
            <strong>{{ customer.name }}</strong>
            <br>
            <span>
                {{ customer.details }}
            </span>
        </div>
        <br>

        <table>
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Rate ({{ currency }})</th>
                    <th>Total ({{ currency }})</th>
                </tr>
            </thead>
            <tbody>
                {{#each items}}
                    <tr>
                        <td>
                            {{ description }}
                        </td>
                        <td>
                            {{ qty }}
                        </td>
                        <td>
                            {{ rate }}
                        </td>
                        <td>{{ total }}</td>
                    </tr>
                {{/each}}
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="3"><strong>Grand Total</strong></td>
                    <td><strong>{{ total }}</strong></td>
                </tr>
            </tfoot>
        </table>
        <br>
        
        <div class="notes">
            {{ notes }}
        </div>
    </main>
</div>`;
