import { getInvoice } from "./db";
import invoiceTemplate from './invoiceTemplate';

async function exportToPDF(id) {
    let settings, invoice;
    try {
        settings = JSON.parse(localStorage.getItem("settings"));
        invoice = await getInvoice(id);
    } catch (e) {
        console.log("Something went wrong");
    }
}
