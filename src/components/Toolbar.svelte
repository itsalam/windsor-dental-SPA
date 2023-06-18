<script lang="ts">
  import BookingButton from "./Booking/BookingButton.svelte";

  let innerWidth: number;
  let active = false;
  const toggleMenu = () => {
    active = !active;
  };

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  let isScrolling = false;

  const handleScroll = () => {
    isScrolling = true;
    setTimeout(() => {
      isScrolling = false;
    }, 1000);
  };

  const handleMenuClick = () => {
    active = false;
  };
</script>

<svelte:window bind:innerWidth on:scroll={handleScroll} />

<nav
  class="toolbar glass"
  class:scrolling={isScrolling}
  class:mobile={innerWidth < 992}
>
  <h2>Windsor Dental Clinic</h2>
  <ul class="menu" class:active>
    <li><a href="#home" on:click={handleMenuClick}> Home </a></li>
    <li><a href="#services" on:click={handleMenuClick}> Services </a></li>
    <li><a href="#team" on:click={handleMenuClick}> Team </a></li>
    <li><a href="#faqs" on:click={handleMenuClick}> FAQs </a></li>
    <BookingButton />
  </ul>
  <button class="menu-button" class:active on:click={toggleMenu}>
    <span />
    <span />
  </button>
</nav>

<style>
  .toolbar {
    --nav-element-spacing-horizontal: 0.5rem;
    --nav-element-spacing-vertical: 0.5rem;
    position: fixed;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0.5rem 2rem;
    background: rgba(255, 255, 255, 0.63);
    border-radius: inherit;
    box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 2px 0 #0000000d;
    transition: background 0.5s ease;
  }

  .scrolling {
    background: transparent;
  }

  .menu {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    justify-content: space-between;
    font-size: calc(0.75 * var(--font-size));
    transition: opacity 0.2s ease;
  }

  .mobile .menu {
    --font-size: 2.2rem;
    --nav-element-spacing-vertical: 0.375rem;
    position: absolute;
    top: 0;
    left: 10px;
    flex-direction: column;
    gap: 0;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    visibility: hidden;
    background-color: white;
    opacity: 0;
  }

  .mobile .menu.active {
    visibility: visible;
    opacity: 1;
  }

  .menu-button {
    --primary: var(--h1-color);
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    align-items: start;
    justify-content: space-between;
    width: 22px;
    height: 13px;
    padding: 0;
    cursor: pointer;
    background: transparent;
    border: none;
    margin: 0;
  }

  .menu-button:focus {
    border: none;
    outline: none;
    box-shadow: none;
  }

  .toolbar:not(.mobile) .menu-button {
    display: none;
  }

  .menu-button span {
    width: 100%;
    height: 2px;
    background-color: var(--primary);
    border-radius: 1px;
    transition: all 0.35s cubic-bezier(0.1, 0.82, 0.76, 0.965);
  }

  .menu-button span:first-of-type {
    transform: rotate(0deg) translateY(0);
  }

  .menu-button span:last-of-type {
    transform: rotate(0deg) translateY(0);
  }

  .menu-button:not(.active):hover span:first-of-type {
    width: 120%;
  }

  .menu-button:not(.active):hover span:last-of-type {
    width: 80%;
  }

  .menu-button.active :global(span:first-of-type) {
    width: 100%;
    transform: translateY(6px) rotate(-135deg);
  }

  .menu-button.active :global(span:last-of-type) {
    width: 100%;
    transform: translateY(-5px) rotate(135deg);
  }

  h2 {
    font-weight: 300;
  }

  li {
    font-size: calc(0.8 * var(--font-size));
    list-style: none;
    cursor: pointer;
  }

  li:hover {
    filter: brightness(1.5);
  }
</style>
