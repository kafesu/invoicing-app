<script>
    import { Link } from "svelte-navigator";
</script>

<header>
    <div class="title-bar">
        <h1 class="title">Invoices</h1>
        <Link to="/settings">
            <span
                class="material-symbols-outlined settings-icon"
            >
                settings
            </span>
        </Link>
    </div>
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

    .settings-icon {
        color:rgb(31, 31, 31);
    }
</style>
