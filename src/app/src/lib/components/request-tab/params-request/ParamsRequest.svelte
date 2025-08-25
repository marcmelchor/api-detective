<script lang="ts">
  import { state, getQueryParams, type KeyValueRecord } from '../../../runes/api.svelte';
  import KeyValueList from '../key-value-list/KeyValueList.svelte';

  function onAfterKeyValue(keyValue: KeyValueRecord) {
    const params = Object.values(keyValue)
      .map(param => `${ param.key }=${ param.value }`)
      .join('&');

    const urlComponents = state.url.split('?');
    const pureUrl = urlComponents[0];
    if (params.length) {
      state.url = `${ pureUrl }?${ params }`;
    } else {
      state.url = `${ pureUrl }`;
    }
  }
</script>

<div class="border-tab-container">
  <div class="d-flex flex-column tab-request-container">
    <h4 class="tab-request-title">Query Params
    </h4>
    <KeyValueList
      ableToAdd="{ !!state.url.length }"
      keyValue="{ getQueryParams() }"
      afterKeyValue="{ val => onAfterKeyValue(val) }" />
  </div>
</div>
