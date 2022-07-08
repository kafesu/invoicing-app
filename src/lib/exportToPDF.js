import { getInvoice } from "./db";
import invoiceTemplate from "./invoiceTemplate";
import { formatId } from "./formatId";
import HandleBars from "handlebars";
import html2pdf from "html2pdf.js";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { Share } from "@capacitor/share";

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

        // Creating the pdf document
        const pdf = await html2pdf().from(htmlInvoice).outputPdf();

        // Converting the pdf document to Base 64
        const base64PDF = btoa(pdf);

        // Write the data to a cache file
        const cacheFileName = "Invoice" + data.id + ".pdf";
        await Filesystem.writeFile({
            path: cacheFileName,
            data: base64PDF,
            directory: Directory.Cache,
        });

        // Get the uri of the file
        const { uri } = await Filesystem.getUri({
            path: cacheFileName,
            directory: Directory.Cache,
        });

        // Share the file
        await Share.share({
            title: cacheFileName,
            text: cacheFileName,
            url: uri,
        });
    } catch (e) {
        console.log(e);
    }
}
