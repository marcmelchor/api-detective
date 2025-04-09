<script lang="ts">
  import { RequestTabs, state } from '../../runes/api.svelte';
  import HeadersRequest from './headers-request/HeadersRequest.svelte';
  import ParamsRequest from './params-request/ParamsRequest.svelte';
</script>

<div class="d-flex flex-column justify-content-center request-tab-container w-100">
  <div class="align-items-center d-flex request-tabs">
    {#each Object.keys(RequestTabs) as tab}
      <div
        on:click={() => state.requestTab = tab as RequestTabs}
        on:keydown={() => state.requestTab = tab as RequestTabs}
        class:active="{state.requestTab === tab}"
        class="request-tab"
        id="{tab}"
        role="button"
        tabindex="{0}">
        <span>{tab}
        </span>
      </div>
    {/each}
  </div>
  {#if state.requestTab === RequestTabs.Params }
    <ParamsRequest />
  {/if}
  {#if state.requestTab === RequestTabs.Headers }
    <HeadersRequest />
  {/if}
</div>

<style>
  .request-tab-container {
    padding: 1em 0;
  }

  .request-tabs {
    gap: 0.7em;
    padding-bottom: 5px;
  }

  .request-tab {
    color: var(--request-tab-color);
    padding: 0.5em 0.5em;
    cursor: pointer;
  }

  .active {
    box-shadow: inset 0 -1px 0 var(--request-tab-active);
    color: var(--request-tab-color-active) !important;
    font-weight: bold;
  }
</style>
