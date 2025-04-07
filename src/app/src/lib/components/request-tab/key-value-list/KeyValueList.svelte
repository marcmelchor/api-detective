<script lang="ts">
  import { state, type KeyValueRecord } from '../../../runes/api.svelte';
  import add from '../../../../assets/add.svg';
  import del from '../../../../assets/delete.svg';

  type Props = { keyValue: KeyValueRecord; afterKeyValue: (k: KeyValueRecord) => void; };
  let { keyValue, afterKeyValue }: Props = $props();

  function onChangeInput(key: number, input: string, isKey = true) {
    if (isKey) {
      keyValue[key].key = input;
    } else {
      keyValue[key].value = input;
    }
    afterKeyValue(keyValue);
  }

  function onDeleteKeyParam(key: number) {
    delete keyValue[key];
    afterKeyValue(keyValue);
  }

  function onAddKeyValue() {
    const lastKey = Object.keys(keyValue).slice(-1);
    keyValue[lastKey.length ? +lastKey + 1 : 0] = { key: '', value: '' };
    afterKeyValue(keyValue);
  }
</script>

<div class="align-items-center d-flex flex-column justify-content-center w-100">
  <div class="d-flex w-100">
    <span class="key-value-header">Key
    </span>
    <span class="key-value-header">Value
    </span>
    <div class="actions-header"></div>
  </div>
  <div class="d-flex flex-column w-100">
    {#each Object.entries(keyValue) as [ key, row ]}
      <div
        id="{key}"
        class="d-flex w-100">
        <div class="align-items-center d-flex item-key-value">
          <input
            class="color-param-key"
            bind:value={ row.key }
            oninput={(ev) => {
              const target = ev.target as HTMLInputElement;
              onChangeInput(+key, target.value);
            }} />
        </div>
        <div class="align-items-center d-flex item-key-value">
          <input
            bind:value={ row.value }
            oninput="{(ev) => {
              const target = ev.target as HTMLInputElement;
              onChangeInput(+key, target.value, false);
            }}"/>
        </div>
        <div class="align-items-center delete-item d-flex">
          <button
            onclick="{ () => onDeleteKeyParam(+key) }"
            class="action-button">
            <img
              alt="delete-{key}"
              src="{del}"
              title="Remove query parameter" />
          </button>
        </div>
      </div>
    {/each}
    {#if state.url.length }
      <div class="add-query align-items-center d-flex justify-content-center">
        <button
          onclick="{ () => onAddKeyValue() }"
          class="action-button">
          <img
            alt="add"
            src="{add}"
            title="Add query parameter" />
        </button>
      </div>
    {/if}
  </div>
</div>

<style>
  .key-value-header {
    border: 0.5px dashed var(--request-tab-color);
    font-weight: bold;
    padding: 0.5em 0 0.5em 0.5em;
    width: 47.5%;

    &:first-child {
      border-right: 0;
    }
  }

  .actions-header {
    width: 5%;
    padding: 0.5em 0 0.5em 0.3em;
  }

  .add-query {
    padding: 0.5em 0;
    width: 95%;
  }

  .item-key-value {
    border: 0.5px dashed var(--request-tab-color);
    overflow: hidden;
    padding: 0.5em 0 0.5em 0.5em;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 47.5%;

    input {
      background-color: transparent;
      border: 1px solid var(--request-editor-background);
      border-radius: 5px 2px;
      color: var(--request-editor-main-color);
      padding: 0 5px;
      width: 95%;
    }
  }

  .color-param-key {
    color: var(--request-tab-active) !important;
  }

  .delete-item {
    padding: 0.5em 0 0.5em 0.3em;
    width: 5%;
  }

  .action-button {
    background-color: transparent;
    border: 0;
    padding: 0;
    cursor: pointer;
  }
</style>