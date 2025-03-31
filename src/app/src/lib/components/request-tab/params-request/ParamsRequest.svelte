<script lang="ts">
  import { state } from '../../../runes/api.svelte';
  import KeyValueList from '../key-value-list/KeyValueList.svelte';
</script>

<div class="border-tab-container">
  <div class="d-flex flex-column tab-request-container">
    <h4 class="tab-request-title">Query Params
    </h4>
    <KeyValueList keyValue="{state.queryParams}" />
  </div>
</div>

<style>
  .tab-request-container {
    width: 98%;
    height: 20em;
    overflow-y: auto;
  }

  .tab-request-title {
    padding: 1em 0;
    color: var(--request-tab-color-active);
  }
</style>