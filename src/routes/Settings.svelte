<script>
    import { navigate } from "svelte-navigator";
    import { onMount } from "svelte";
    import PageHeader from "../components/PageHeader.svelte";
    import Quill from "quill";

    let settings = localStorage.getItem("settings");
    if (settings) settings = JSON.parse(settings);
    else settings = {};
    let editor;

    onMount(async () => {
        let quill = new Quill(editor, {
            theme: "snow",
        });
        editor.children[0].innerHTML = settings.defaultNotes;
    });

    const back = () => navigate("/");

    const save = () => {
        localStorage.setItem(
            "settings",
            JSON.stringify({
                ...settings,
                defaultNotes: editor.children[0].innerHTML,
            })
        );
        back();
    };
</script>

<PageHeader title="Settings" />

<main>
    <label for="businessName">Business Name</label>
    <input
        id="businessName"
        bind:value={settings.businessName}
        type="text"
        placeholder="Business Name"
    />
    <label for="businessDetails">Business Details</label>
    <p
        id="businessDetails"
        class="textarea"
        contenteditable="true"
        bind:innerHTML={settings.businessDetails}
    />
    <label for="currencySymbol">Currency Symbol</label>
    <input
        type="text"
        id="currencySymbol"
        placeholder="BWP, USD etc"
        bind:value={settings.currencySymbol}
    />
    <label for="defaultNotes">Default Notes</label>
    <div bind:this={editor} class="editor" />
    <button class="primary" on:click={save}>Save</button>
    <button class="danger" on:click={back}>Cancel</button>
</main>

<style>
    @import "https://cdn.quilljs.com/1.3.6/quill.snow.css";
    main {
        display: flex;
        flex-direction: column;
        padding: 15px;
        height: 100vh;
    }

    .textarea {
        height: 300px;
    }

    .editor {
        background-color: white;
    }

    p {
        font-size: 0.85rem;
    }
</style>
