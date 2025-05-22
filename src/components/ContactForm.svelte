<script>
    let messageArea;
    
    function handleInput() {
        messageArea.style.height = 'auto';
        messageArea.style.height = messageArea.scrollHeight + 'px';
    }
</script>

<form name="feedback" method="POST" action="/success">
    <label for="name">Name</label>
    <input id="name" type="text" name="name" />
    
    <label for="email">Email</label>
    <input id="email" type="email" name="email" required />
    
    <label for="feedback">Message</label>
    <textarea
        bind:this={messageArea}
        on:input={handleInput}
        id="feedback"
        wrap="soft"
        name="feedback"
        required
    ></textarea>
    
    <button type="submit">Submit</button>
</form>

<style>
    form {
        margin: auto;
        min-width: 250px;
        width: min(450px, 90%);
        font-family: "Apfel Grotezk", sans-serif;
    }

    label {
        color: #002C2E;
        display: block;
        font-size: 1rem;
        font-weight: bold;
        padding-left: 0.25rem;
        margin-bottom: 0.125rem;
    }

    input,
    textarea {
        border-radius: 5px;
        border: 1px solid #cbd5e1;
        border-radius: 1rem;
        font-size: inherit;
        font-family: inherit;
        font-weight: normal;
        width: 100%;
        margin-bottom: 1rem;
        text-align: left;
        background-color: #fdfdfd;
        padding: 0.75rem 1rem;
    }

    textarea {
        min-height: 100px;
        max-height: 300px;
        height: auto;
        resize: vertical;
        overflow: hidden;
        line-height: 1.5;
    }

    button {
        font-family: inherit;
        font-weight: bold;
        color: #002C2E;
        background-color: #f5d03d;
        border: 1px solid #002C2E;
        font-size: 1.25rem;
        padding: 0.75rem 2rem;
        border-radius: 2rem;
        cursor: pointer;
        transition: all 0.2s ease;
        width: auto;
        margin: 1rem 0;
    }

    button:hover {
        background-color: #efe3b4;
    }
</style>