<script>
    import { onMount, onDestroy } from 'svelte';
    
    export let size = 450;
    
    let isOpen = false;
    let timer;
    let hourRotation = 0;
    let minuteRotation = 0;
    let showArc = true;
    let estTime;
    let closedMessage = "te";

    function updateClosedMessage(hours, minutes, day) {
        if ((day >= 5) || ((day === 4 || day === 0) && hours < 17)) {
            const remainingHours = 16 - hours;
            const remainingMinutes = 60 - minutes;
            // return `We are closed. Reopening in ${remainingHours}h ${remainingMinutes}m. See you then!`;
            return `We are closed. Reopening in ${remainingHours}h ${remainingMinutes}m`;
        } else {
            return "We are currently closed. See you on Thursday!"
        }
    }
    function updateTimeDisplay() {
        estTime = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }));
        const hours = estTime.getHours();
        const minutes = estTime.getMinutes();
        const day = estTime.getDay();

        // Calculate all time-based states from single estTime
        isOpen = hours >= 17 && hours < 21 && day >= 4;
        showArc = !(hours >= 1 && hours < 9);
        hourRotation = ((hours % 12) * 30) + (minutes * 0.5);
        minuteRotation = minutes * 6;

        if (!isOpen) {
            closedMessage = updateClosedMessage(hours, minutes, day);
        }
    }

    function syncWithRealClock() {
        const now = new Date();
        const delay = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
        
        updateTimeDisplay();
        
        setTimeout(() => {
            updateTimeDisplay();
            timer = setInterval(updateTimeDisplay, 60000);
        }, delay);
    }

    onMount(() => {
        syncWithRealClock();
    });

    onDestroy(() => {
        if (timer) clearInterval(timer);
    });
</script>

<div class="clock-container" style="width: {size}px; height: {size}px;">
    <svg 
        class="clock-face" 
        viewBox="0 0 200 200"
        width="100%"
        height="100%"
    >
        <!-- Clock face -->
        <circle cx="100" cy="100" r="90" fill="#f7f2de" stroke="#002c2e" stroke-width="4"/>
        
        <!-- Business hours arc (5PM-9PM) -->
        {#if showArc}
        <path 
            d="M190 100A90 90 0 0 1 55 177.94L100 100Z"
            fill="#00ff0822"
            stroke="none"
            transform="rotate(60 100 100)"
            class="hours-highlight"
        />
        {/if}
        
        <!-- Hour numbers -->
        {#each Array(12) as _, i}
            <text
                x="100"
                y="105"
                text-anchor="middle"
                transform="
                    translate({Math.cos((i * 30 - 90) * (Math.PI / 180)) * 75},{(Math.sin((i * 30 - 90) * (Math.PI / 180)) * 75)})
                "
                font-family="Apfel Grotezk"
                font-size="16"
                fill="#002c2e"
            >{i === 0 ? '12' : i}</text>
        {/each}

        <!-- Hour hand -->
        <line 
            x1="100"
            y1="100"
            x2="100"
            y2="60"
            stroke="#002c2e"
            stroke-width="2"
            stroke-linecap="round"
            text-anchor="middle"
            transform="rotate({hourRotation}, 0, 0)"
            class="hour-hand"
        />
        
        <!-- Minute hand -->
        <line 
            x1="100"
            y1="100"
            x2="100"
            y2="40"
            stroke="#002c2e"
            stroke-width="3"
            stroke-linecap="round"
            transform="rotate({minuteRotation}, 0, 0)"
            class="minute-hand"
        />
        
        <!-- Center dot -->
        <circle cx="100" cy="100" r="4" fill="#002c2e"/>

    </svg>
    <div class="status-indicator" class:open={isOpen}>
        {#if isOpen}
            Open
        {:else}
            <span class="status-message">{closedMessage}</span>
        {/if}
    </div>
</div>

<style>
    .clock-container {
        margin-top: 8rem;
        position: relative;
        max-width: 90vmin;
        
    }

    .clock-face {
        width: 100%;
        height: 100%;
    }

    .hours-highlight {
        animation: pulse 2s ease-in-out infinite;
    }

    .status-indicator {
        position: absolute;
        bottom: -2rem;
        left: 50%;
        transform: translateX(-50%);
        font-family: "Apfel Grotezk";
        font-size: 1.25rem;
        font-weight: bold;
        color: #ff3b30;
        white-space: nowrap;
    }

    .status-indicator.open {
        color: #34c759;
    }

    @keyframes pulse {
        0% { opacity: 0.6; }
        50% { opacity: 1; }
        100% { opacity: 0.6; }
    }

    @media (max-width: 800px) {
        .clock-container {
            width: 90vw !important;
            height: 90vw !important; /* Use vw for height to maintain aspect ratio */
            /* height: 90vw !important; */
            max-width: 450px;  /* Add max-width constraint */
            /* margin: 0 auto;    Ensure center alignment */
            display: flex;     /* Use flexbox for alignment */
            flex-direction: column;
            align-items: center;
        }

        .clock-face {
            margin-top: -4rem;
        }

        .status-indicator {
            position: relative; /* Change from absolute */
            bottom: 0;
            left: 0;
            transform: none;   /* Remove transform since using flex */
            margin-top: 0.5rem;  /* Add spacing */
            text-align: center;
            width: 100%;
        }
    }

    .hour-hand, .minute-hand {
        transform-origin: center;
        transition: transform 0.5s cubic-bezier(0.4, 2.08, 0.55, 0.44);
    }

    .minute-hand {
        transform-origin: center;
    }

    /* Base styles */
    .clock-container {
        position: relative;
        width: 100%;
        max-width: 450px;
        box-sizing: border-box;
    }
</style>