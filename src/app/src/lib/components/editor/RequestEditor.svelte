<script lang="ts">
  import { state, RequestTypes } from '../../runes/api.svelte';
</script>

<div class="align-items-center d-flex gap-3 w-100">
  <div class="align-items-center d-flex min-width-select">
    <label for="request-type-select">
    </label>
    <select
      bind:value={state.requestType}
      on:change={ev => {
        state.requestType = (ev.target as HTMLSelectElement).value as RequestTypes;
      }}
      id="request-type-select">
      {#each Object.keys(RequestTypes) as request}
        <option value="{request}">{request}
        </option>
      {/each}
    </select>
  </div>
  <input
    bind:value={state.url}
    placeholder="Type your url..."
    type="text" />
  <button
    disabled="{!state.url.length}"
    class="h-100 button button--primary">Send
  </button>
</div>

<style>
  .min-width-select {
    min-width: 6rem;
  }
</style>