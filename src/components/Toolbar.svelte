<script lang="ts">
  let innerWidth;
  let active = false;
  const toggleMenu = (e: PointerEvent) => {
    active = !active;
    console.log("toggle menu", e);
  };
</script>

<svelte:window bind:innerWidth />

<nav class="toolbar" class:mobile={innerWidth < 992}>
  <h2>Windsor Dental Clinic</h2>
  <ul class="menu" class:active>
    <li><a> Home </a></li>
    <li><a> Services </a></li>
    <li><a> About </a></li>
    <li><a> Contact </a></li>
    <button> Book Online </button>
  </ul>
  <button class:active class="menu-button" on:click={toggleMenu}>
    <span />
    <span />
  </button>
</nav>

<style>
  .toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    width: inherit;
    position: fixed;
    padding: 1rem 2rem;
  }

  .menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    font-size: calc(0.75 * var(--font-size));
    transition: all 0.2s ease;
  }

  .mobile .menu {
    --font-size: 2.2rem;
    --nav-element-spacing-vertical: 0.375rem;
    position: absolute;
    justify-content: center;
    flex-direction: column;
    background-color: white;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 10px;
    gap: 0rem;
    transition: all 0.6s ease;
    opacity: 0%;
    visibility: hidden;
  }

  .mobile .menu.active {
    visibility: visible;
    opacity: 100%;
  }

  .menu-button {
    --primary: var(--h1-color);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
    gap: 0.25rem;
    border: none;
    background: transparent;
    cursor: pointer;
    padding: 0;
    height: 13px;
    width: 22px;
  }

  .toolbar:not(.mobile) .menu-button {
    display: none;
  }

  .menu-button:focus {
    outline: none;
    border: none;
    -webkit-box-shadow: none;
    box-shadow: none;
  }

  .menu-button span {
    background-color: var(--primary);
    border-radius: 1px;
    height: 2px;
    width: 100%;
    transition: all 0.2s cubic-bezier(0.1, 0.82, 0.76, 0.965);
  }

  .menu-button span:first-of-type {
    transform: rotate(0deg) translateY(0px);
  }

  .menu-button span:last-of-type {
    transform: rotate(0deg) translateY(0px);
  }

  .menu-button:not(.active):hover span:first-of-type {
    width: 120%;
  }

  .menu-button:not(.active):hover span:last-of-type {
    width: 80%;
  }

  :global(.menu-button.active) span:first-of-type {
    transform: translateY(5px) rotate(-135deg);
    width: 100%;
  }

  :global(.menu-button.active) span:last-of-type {
    transform: translateY(-5px) rotate(135deg);
    width: 100%;
  }

  h2 {
    font-weight: 300;
  }

  li {
    list-style: none;
    font-size: calc(0.8 * var(--font-size));
  }

  button {
    font-size: calc(0.85 * var(--font-size));
    padding: calc(0.8 * var(--form-element-spacing-vertical))
      var(--form-element-spacing-horizontal);
    max-width: 210px;
  }
</style>
