<script>
    let open = false;
    let modalElement;

    const toggleMenu = () => {
        open = !open;
    };

    // Handle clicks outside modal
    function handleClickOutside(event) {
        if (open && modalElement && !modalElement.contains(event.target) && !event.target.closest('.hamburger')) {
            open = false;
        }
    }

    // Handle navigation clicks
    function handleNavClick() {
        // Remove transition before changing page
        modalElement.style.transition = 'none';
        open = false;
    }
</script>

<svelte:window on:click={handleClickOutside} />

<style>
    .mobile-modal {
        position: fixed;
        top: 0;
        right: 0;
        width: 30vw;
        height: 100vh;
        background-color: rgba(65, 109, 111, 0.65);
        backdrop-filter: blur(6px);
        z-index: 9998;
        border-left: 2px solid #002c2e;
        transform: translateX(100%);
        transition:
            transform 0.3s cubic-bezier(0.785, 0.135, 0.15, 0.86);
        pointer-events: none;
    }
    .mobile-modal a {
        display: flex;
        align-items: center;
        font-family: "Pally-Variable", sans-serif;
        font-weight: bold;
        font-size: clamp(2.5rem, 5vw, 6rem);
        color: var(--background-color); /* Light text on dark background */
        text-decoration: none;
        white-space: nowrap;
        text-align: left;
        transition: color 0.2s ease;
    }

    .mobile-modal a:hover {
        color: white; /* Pure white for hover state */
    }
    @media (max-width: 1024px) {
        .mobile-modal {
            padding-top: 8rem;
            width: 100vw;
            text-align: center;
        }
        .mobile-modal a {
            font-size: 4rem;
            justify-content: center;
            text-align: center;
        }
    }

    .mobile-modal.show {
        transform: translateX(0);
        opacity: 1;
        pointer-events: auto;
    }

    /* Button styling for the hamburger menu */
    .hamburger {
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
        transition: opacity 0.3s ease;
        opacity: 1;
        margin-bottom: 2rem; /* Add margin to create space */
        position: relative; /* Change from fixed to relative */
    }

    .hamburger.hide {
        opacity: 0;
        pointer-events: none;
    }

    .close-button {
        position: absolute;
        top: 3.25rem;
        right: 1rem;
        background: none;
        border: none;
        cursor: pointer;
        padding: 0.5rem;
    }

    .close-button svg {
        width: 36px;
        height: 36px;
        stroke: var(--background-color); /* Match the light text color */
    }

    .mobile-modal ul {
        margin-top: 5rem;
        padding: 0 2rem;
        width: 100%;
        box-sizing: border-box;
    }

    .mobile-modal li {
        margin-bottom: 1.5rem;
    }


</style>

<button class="hamburger {open ? 'hide' : ''}" aria-label="Toggle navigation" on:click={toggleMenu}>
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="3" y1="6" x2="21" y2="6" stroke="#002C2E" stroke-width="2" stroke-linecap="round"></line>
        <line x1="3" y1="12" x2="21" y2="12" stroke="#002C2E" stroke-width="2" stroke-linecap="round"></line>
        <line x1="3" y1="18" x2="21" y2="18" stroke="#002C2E" stroke-width="2" stroke-linecap="round"></line>
    </svg>
</button>

<div 
    bind:this={modalElement}
    class="mobile-modal {open ? 'show' : ''}"
>
    <button class="close-button" aria-label="Close menu" on:click={() => open = false}>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    </button>
    <ul>
        <li>
            <a href="/ghost-runner-pizza/" on:click={handleNavClick}>
                Home
            </a>
        </li>
        <li>
            <a href="/ghost-runner-pizza/menu/" on:click={handleNavClick}>
                Menu
            </a>
        </li>
        <li>
            <a href="https://google.com" on:click={handleNavClick}>
                Order Now
            </a>
        </li>
        <li>
            <a href="/ghost-runner-pizza/contact/" on:click={handleNavClick}>
                Contact
            </a>
        </li>
    </ul>
</div>