<script>
    import { onMount, onDestroy } from 'svelte';
    
    export let size = 450;
    
    let isOpen = false;
    let timer;
    let hourRotation = 0;
    let minuteRotation = 0;
    let showArc = true;
    let estTime;

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
    }

    onMount(() => {
        updateTimeDisplay();
        timer = setInterval(updateTimeDisplay, 60000);
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
            stroke-width="4"
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
            stroke-width="2"
            stroke-linecap="round"
            transform="rotate({minuteRotation}, 0, 0)"
            class="minute-hand"
        />
        
        <!-- Center dot -->
        <circle cx="100" cy="100" r="4" fill="#002c2e"/>

    </svg>
    <div class="status-indicator" class:open={isOpen}>
        {isOpen ? 'OPEN NOW' : 'CLOSED'}
    </div>
</div>

<style>
    .clock-container {
        position: relative;
        max-width: 90vmin;
        margin: 0 auto;
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
            height: 90vw !important;
        }
    }

    .hour-hand, .minute-hand {
        transform-origin: center;
        transition: transform 0.5s cubic-bezier(0.4, 2.08, 0.55, 0.44);
    }

    .minute-hand {
        transform-origin: center;
    }
</style>