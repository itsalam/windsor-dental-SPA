<script lang="ts">
  export let className: string;
  export let name: string;
  export let title: string;
  export let type: string;
  export let required: boolean;
  export let placeholder: string;
</script>

<label for={name} class={className}>
  <h6>{title}</h6>
  <input
    {type}
    id={name}
    {name}
    placeholder={placeholder ?? title}
    {required}
  />
</label>