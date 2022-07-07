import { getInvoice } from "./db";
import invoiceTemplate from "./invoiceTemplate";
import { formatId } from "./formatId";
import HandleBars from "handlebars";
import html2pdf from "html2pdf.js";

export default async function exportToPDF(id) {
    let settings, invoiceData;
    try {
        // Getting settings from localStorage
        settings = JSON.parse(localStorage.getItem("settings"));

        // Getting invoice data using id
        invoiceData = await getInvoice(id);

        // Combining the invoiceData and settings into one data object
        const data = { ...settings, ...invoiceData };

        // Converting the items object into an array of items
        // While at it, also calculating the total for each item
        data.items = Object.entries(data.items).map(([_, value]) => ({
            ...value,
            total: (value.rate * value.qty).toFixed(2),
        }));

        // Adding two decimal places to the invoice total
        data.total = data.total.toFixed(2);

        // Formatting the id for printing
        data.id = formatId(id);

        // Preparing the template
        const template = HandleBars.compile(invoiceTemplate);

        // Combining the template with the data
        const htmlInvoice = template(data);

        // Create a print
        const worker = html2pdf()
            .from(htmlInvoice)
            .save("Invoice " + formatId(id));
    } catch (e) {
        console.log(e);
    }
}
