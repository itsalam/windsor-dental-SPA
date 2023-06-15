<script lang="ts">
  import { sanity, type ContactInfo, type Hours, type HoursInfo } from "../store/client";

  const SORTER = {
    "sunday": 0, // << if sunday is first day of week
    "monday": 1,
    "tuesday": 2,
    "wednesday": 3,
    "thursday": 4,
    "friday": 5,
    "saturday": 6,
  // "sunday": 7
  };

  let hoursInfo: HoursInfo,
    contactInfo: ContactInfo[],
    hours;

  const writeDay = (day: string) => {
    return day.slice(0,1).toUpperCase()+day.slice(1,3);
  }

  const writeHours = (hours: Hours) => {
    if (hours.closed) return "Closed";
    const convertToTime = (number) => {
      if (number > 12) return number - 12 + "pm";
      if (number == 12) return number + "pm";
      if (number == 0) return 12 + "am";
      return number + "am";
    } 
    return convertToTime(hours.from) + " - " + convertToTime(hours.to);
  }

  sanity.subscribe((value) => {
    hoursInfo = value.hoursInfo;
    contactInfo = value.contactInfo;
    hours = Object.entries(hoursInfo)
      .filter(([key]) => key.includes("day"))
      .sort(([keyA], [keyB]) =>
        SORTER[keyA] - SORTER[keyB]
      )
  });

</script>

<footer>
  <div class="body">
    <div class="info">

      <div class="footer-title">
        <h3>Windsor Dental Clinic</h3>
        {#each contactInfo as info}
          <p>{info.value.replaceAll(", ",",\n")}</p>
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
        <li><a class=""> Home </a></li>
        <li><a class=""> Services </a></li>
        <li><a class=""> About </a></li>
        <li><a class=""> Contact </a></li>
      </ul>
    </div>
  </div>
  <button class="up-nav"> 
    <svg enable-background="new 0 0 32 32" height="32px" id="Layer_1" version="1.1" viewBox="0 0 32 32" width="32px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M18.221,7.206l9.585,9.585c0.879,0.879,0.879,2.317,0,3.195l-0.8,0.801c-0.877,0.878-2.316,0.878-3.194,0  l-7.315-7.315l-7.315,7.315c-0.878,0.878-2.317,0.878-3.194,0l-0.8-0.801c-0.879-0.878-0.879-2.316,0-3.195l9.587-9.585  c0.471-0.472,1.103-0.682,1.723-0.647C17.115,6.524,17.748,6.734,18.221,7.206z" fill="currentColor" /></svg>
  </button>
  <p class="copyright">Copyright © {new Date().getFullYear()}. All rights reserved.</p>
</footer>


<style>
  footer {
    background-color: rgb(243 244 246/ 1);
    position: relative;
    margin: auto 0;
    padding: 1rem 4rem;
    display: flex;
    flex-direction: column;
  }

  .body {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
    gap: 1rem;
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
  }

  .nav {
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    transition: opacity 0.2s ease;
    margin-top: 66%;
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
    max-width: 62px;
    height: 62px;
    border-radius: 50%;
    transform: translate(-50%, 50%);
    align-self: self-end;
    padding: 0;
  }

  button svg {
    width: 18px;
  }

</style>