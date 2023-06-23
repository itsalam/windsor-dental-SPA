<script lang="ts">
  import { sortHours, writeDay, writeHours } from "~/utils/helper";
  import {
    sanity,
    type ContactInfo,
    type Hours,
    type HoursInfo,
  } from "../store/client";

  let hoursInfo: HoursInfo,
    contactInfo: ContactInfo[],
    hours: [string, Hours][];

  sanity.subscribe((value) => {
    hoursInfo = value.hoursInfo;
    contactInfo = value.contactInfo;
    hours = sortHours(hoursInfo);
  });
</script>

<footer>
  <div class="body">
    <div class="info">
      <div class="footer-title">
        <h3>Windsor Dental Clinic</h3>
        {#each contactInfo as info}
          <h6>{info.name}</h6>
          <p>{info.value.replaceAll(", ", ",\n")}</p>
        {/each}
      </div>
      <div class="hours">
        <h6>Hours</h6>
        {#each hours as info}
          <div>
            <p>{writeDay(info[0])}</p>
            <p>{writeHours(info[1])}</p>
          </div>
        {/each}
      </div>
    </div>

    <div class="nav">
      <ul class="menu">
        <li><a href="#home"> Home </a></li>
        <li><a href="#services"> Services </a></li>
        <li><a href="#team"> Team </a></li>
        <li><a href="#faqs"> FAQs </a></li>
      </ul>
      <button class="up-nav">
        <svg
          enable-background="new 0 0 32 32"
          height="32px"
          id="Layer_1"
          version="1.1"
          viewBox="0 0 32 32"
          width="32px"
          xml:space="preserve"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          ><path
            d="M18.221,7.206l9.585,9.585c0.879,0.879,0.879,2.317,0,3.195l-0.8,0.801c-0.877,0.878-2.316,0.878-3.194,0  l-7.315-7.315l-7.315,7.315c-0.878,0.878-2.317,0.878-3.194,0l-0.8-0.801c-0.879-0.878-0.879-2.316,0-3.195l9.587-9.585  c0.471-0.472,1.103-0.682,1.723-0.647C17.115,6.524,17.748,6.734,18.221,7.206z"
            fill="currentColor"
          /></svg
        >
      </button>
    </div>
  </div>

  <p class="copyright">
    Copyright © {new Date().getFullYear()}. All rights reserved.
  </p>
</footer>

<style>
  footer {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 2rem 4rem;
    margin: auto 0;
    overflow: hidden;
    background-color: rgb(243 244 246/ 100%);
  }

  .body {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: stretch;
    justify-content: space-between;
  }

  .info {
    display: flex;
    gap: 4rem;
  }

  .info p {
    font-size: calc(0.75 * var(--font-size));
  }

  .hours {
    display: flex;
    flex-direction: column;
  }

  .hours h6 {
    align-self: center;
  }

  .hours div {
    display: flex;
    gap: 0.5rem;
    justify-content: space-between;
  }

  .hours p {
    font-size: calc(0.75 * var(--font-size));
    white-space: nowrap;
  }

  .nav {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: auto;
  }

  .menu {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: space-between;
    padding-top: 3rem;
  }

  .copyright {
    text-align: end;
  }

  li {
    list-style: none;
  }

  button {
    position: absolute;
    top: 0;
    right: 0;
    align-self: self-end;
    max-width: 62px;
    height: 62px;
    padding: 0;
    border-radius: 50%;
  }

  button svg {
    width: 18px;
  }

  @media (orientation: portrait) {
    footer {
      padding: 1rem;
    }

    .body {
      flex-direction: column;
      gap: 1rem;
    }

    .info {
      flex-direction: column;
      gap: 1rem;
    }

    .hours {
      width: 50%;
    }

    .nav {
      position: initial;
    }

    .up-nav {
      top: 50%;
      right: 4rem;
      transform: translateY(-50%);
    }

    .menu {
      padding: 2rem;
    }
  }
</style>
