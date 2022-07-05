<script>
    export let customerDetails = {};
</script>

<label for="customerName">Customer Name</label>
<input
    id="customerName"
    type="text"
    placeholder="Customer Name"
    bind:value={customerDetails.name}
/>

<label for="contactDetails">Contact Details</label>
<p
    id="contactDetails"
    class="textarea"
    contenteditable="true"
    bind:innerHTML={customerDetails.details}
    style="height: 150px;"
/>
