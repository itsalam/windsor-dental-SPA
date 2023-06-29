<script lang="ts">
  export let className: string = "";
  export let name: string = "";
  export let title: string;
  export let type: string = "";
  export let required: boolean = false;
  export let placeholder: string = undefined;
</script>

<label for={name} class={className}>
  <h6>{title} {required ? "*" : ""}</h6>
  {#if $$slots.default}
    <slot />
  {:else}
    <input
      {type}
      id={name}
      {name}
      placeholder={placeholder ?? title}
      {required}
    />
  {/if}
</label>
