<script>
  import { toggleModal } from "~/utils/modal";
</script>

<button class="book-button glass" on:mousedown={toggleModal()}>
  Request Online
</button>

<style>
  .book-button {
    padding: var(--form-element-spacing-vertical)
      var(--form-element-spacing-horizontal);
    font-size: calc(0.8 * var(--font-size));
    margin-bottom: 0;
  }
</style>
