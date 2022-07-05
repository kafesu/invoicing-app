<script>
    import { Router, Route } from "svelte-navigator";
    import Settings from "./routes/Settings.svelte";
    import Invoice from "./routes/Invoice.svelte";
    import Index from "./routes/Index.svelte";
    import Print from "./routes/Print.svelte";
</script>

<Router primary={false}>
    <Route path="/" component={Index} />
    <Route path="/settings" component={Settings} />
    <Route path="/invoice/:id" component={Invoice} />
    <Route path="/print/:id" component={Print} />
</Router>
