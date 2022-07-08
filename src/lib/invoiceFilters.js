export const dueFilterPredicate = (invoice) =>
    Date.now() > new Date(invoice.data.dates.due).getTime() &&
    !invoice.data.paid;

export const unpaidInvoicesPredicate = (invoice) =>
    Date.now() < new Date(invoice.data.dates.due).getTime() &&
    !invoice.data.paid;

export const paidInvoicesPredicate = (invoice) => invoice.data.paid;
