import Dexie, { liveQuery } from "dexie";
import dayjs from "dayjs";

const db = new Dexie("main");

db.version(1).stores({
    invoices: "++id, data",
});

// Set up live query for all invoices
export function createInvoicesLiveQuery() {
    return liveQuery(async () => (await db.invoices.toArray()).reverse());
}

export async function getAllInvoices() {
    return await db.invoices.toArray();
}

// Get a single invoice
export async function getInvoice(id) {
    const response = await db.invoices.get(Number(id));
    if (response) {
        return response.data;
    } else {
        throw "Something went wrong";
    }
}

// Save an invoice
export async function saveInvoice(id, data) {
    return await db.invoices.update(Number(id), { data });
}

// Create a new invoice
export async function newInvoice() {
    const now = dayjs(Date.now()).format("YYYY-MM-DD");
    const id = await db.invoices.add({
        data: {
            customer: { name: "", details: "" },
            dates: { issued: now, due: now },
            items: {},
            paid: false,
            total: 0,
        },
    });
    return id;
}

// Delete an invoice
export async function deleteInvoice(id) {
    await db.invoices.delete(Number(id));
}
