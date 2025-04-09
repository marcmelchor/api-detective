<script lang="ts">
  import { state } from '../../../runes/api.svelte';
  import KeyValueList from '../key-value-list/KeyValueList.svelte';
</script>

<div class="border-tab-container">
  <div class="d-flex flex-column tab-request-container">
    <h4 class="tab-request-title">Headers
    </h4>
    <KeyValueList
      ableToAdd="{ true }"
      afterKeyValue="{ val => state.queryHeaders = val }"
      keyValue="{ state.queryHeaders }" />
  </div>
</div>
