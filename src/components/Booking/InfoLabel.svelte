<script lang="ts">
  export let className: string = "";
  export let title: string;
</script>

<div class={"label" + ` ${className}`}>
  <h6>{title}</h6>
  <p><slot /></p>
</div>

<style>
  .label {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }
</style>
