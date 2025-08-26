<script lang="ts">
  import { state } from '../../../runes/api.svelte';
  import KeyValueList from '../key-value-list/KeyValueList.svelte';
</script>

<section>
  <h4>Headers
  </h4>
  <KeyValueList
    ableToAdd="{ true }"
    afterKeyValue="{ val => state.queryHeaders = val }"
    keyValue="{ state.queryHeaders }" />
</section>
