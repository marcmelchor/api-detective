<script lang="ts">
  import { state, RequestTypes } from '../../runes/api.svelte';
</script>

<div class="w-100 d-flex align-items-center editor-height">
  <div class="d-flex align-items-center h-100 select-label">
    <label for="request-type-select"></label>
    <select
      bind:value={state.requestType}
      on:change={ev => {
        state.requestType = (ev.target as HTMLSelectElement).value as RequestTypes;
      }}
      class="h-100 cursor-pointer request-select">
      {#each Object.keys(RequestTypes) as request}
        <option value="{request}">{request}
        </option>
      {/each}
    </select>
    <input
      bind:value={state.url}
      class="h-100 request-input"
      type="text" />
  </div>
  <button
    disabled="{!state.url.length}"
    class="h-100 button button--primary">Send
  </button>
</div>

<style>
  .editor-height {
    height: 2em;
  }

  .select-label {
    flex: 1;
    margin-right: 1em;
    border: 0.5px solid var(--request-editor-main-color);
    border-radius: 5px;
  }

  .request-select {
    border: 0;
    border-radius: 5px 0 0 5px;
    border-right: 1px solid var(--request-editor-main-color);
    background: var(--request-editor-background);
  }

  .request-input {
    flex: 1;
    border: 0;
    padding: 0;
    border-radius: 0 5px 5px 0;
    text-indent: 0.5em;
    background: var(--request-editor-background);
  }
</style>