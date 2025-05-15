<script>
  import { onMount } from 'svelte';

  export let activeTab = 'pizza';
  let insetValue = "0 100% 0 0";
  let paused = false;

  const update = (tab) => {
    const insetValues = {
      pizza: "0 81.5% 0 1%",
      salad: "0 59.5% 0 22%",
      beverage: "0 27% 0 44.5%",
      dessert: "0 0.5% 0 76.5%",
    };
    insetValue = insetValues[tab] || "0 100% 0 0";
    activeTab = tab;
  };

  const scrollToSection = (section) => {
    if (paused) return;
    paused = true;
    const element = document.querySelector(section);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      document.body.classList.add("lock-scroll");
      window.scrollTo({ top: y, behavior: "smooth" });
      update(section.substring(1));
    }
    setTimeout(() => {
      document.body.classList.remove("lock-scroll");
      paused = false;
    }, 650);
  };

  onMount(() => {
    const sections = Array.from(document.querySelectorAll(".menu-container"));
    const offset = 180;

    const handleScroll = () => {
      if (paused) return;
      const scrollPos = window.scrollY + offset;
      const bottomThreshold = 50;
      const scrollBottom = window.innerHeight + window.scrollY;
      const pageHeight = document.documentElement.scrollHeight;
      
      if (pageHeight - scrollBottom < bottomThreshold) {
        update("dessert");
        return;
      }

      let currentSection = sections[0];
      for (let section of sections) {
        if (section.offsetTop <= scrollPos) {
          currentSection = section;
        }
      }

      const className = currentSection.classList[0];
      update(className);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });
</script>

<div class="wrapper">
  <ul class="menu-select">
    <li>
      <input
        type="radio"
        id="pizza-tab"
        name="menu-tabs"
        checked={activeTab === 'pizza'}
        on:click={() => scrollToSection(".pizza")}
      />
      <label for="pizza-tab" class="tab-label">Pizza</label>
    </li>
    <li>
      <input
        type="radio"
        id="salad-tab"
        name="menu-tabs"
        checked={activeTab === 'salad'}
        on:click={() => scrollToSection(".salad")}
      />
      <label for="salad-tab" class="tab-label">Salad</label>
    </li>
    <li>
      <input
        type="radio"
        id="beverage-tab"
        name="menu-tabs"
        checked={activeTab === 'beverage'}
        on:click={() => scrollToSection(".beverage")}
      />
      <label for="beverage-tab" class="tab-label">Beverages</label>
    </li>
    <li>
      <input
        type="radio"
        id="dessert-tab"
        name="menu-tabs"
        checked={activeTab === 'dessert'}
        on:click={() => scrollToSection(".dessert")}
      />
      <label for="dessert-tab" class="tab-label">Dessert</label>
    </li>
  </ul>
  <div
    aria-hidden="true"
    class="clip-path-container"
    style="clip-path: inset({insetValue} round 1em)"
  >
    <ul class="menu-select list-overlay">
      <li><button type="button" class="tab-label overlay">Pizza</button></li>
      <li><button type="button" class="tab-label overlay">Salad</button></li>
      <li><button type="button" class="tab-label overlay">Beverages</button></li>
      <li><button type="button" class="tab-label overlay">Dessert</button></li>
    </ul>
  </div>
</div>

<style>
  .wrapper {
    position: sticky;
    top: 4.25rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: fit-content;
    margin: 0 auto;
    margin-top: 2rem;
    font-family: "Apfel Grotezk";
    font-weight: 500;
    font-size: 1rem;
    margin-bottom: 4rem;
    z-index: 999;
  }

  .wrapper::before {
    content: "";
    position: absolute;
    padding: 0.25rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    background-color: #efefef;
    border-radius: 999px;
    z-index: -1;
    box-shadow: 0 5px 20px #00000026;
  }

  .menu-select {
    position: relative;
    display: flex;
    width: 100%;
    justify-content: center;
    gap: 0.5rem;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    position: relative;
  }

  li [type="radio"] {
    display: none;
  }

  .tab-label {
    display: flex;
    height: 0;
    align-items: center;
    gap: 1rem;
    border-radius: 100%;
    padding: 1rem;
    font-size: 1rem;
    color: var(--text-color);
    cursor: pointer;
    background: none;
    border: none;
    font-family: inherit;
    font-weight: inherit;
  }

  .list-overlay {
    background: #416d6f;
  }

  .clip-path-container {
    position: absolute;
    z-index: 10;
    width: 100%;
    overflow: hidden;
    transition: clip-path 0.65s cubic-bezier(0, 0, 0.2, 1);
  }

  .overlay {
    color: white;
  }

  @media (max-width: 405px) {
    .wrapper {
      transform: scale(0.90);
    }

  }
</style>