<script>
    export let dates = {};
</script>

<label for="dateIssued">Date Issued</label>
<input id="dateIssued" type="date" bind:value={dates.issued} />

<label for="dateDue">Date Due</label>
<input id="dateDue" type="date" bind:value={dates.due} />
