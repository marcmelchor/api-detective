export enum RequestTabs {
  Params = 'Params',
  Authorization = 'Authorization',
  Headers = 'Headers',
  Body = 'Body'
}

export enum RequestTypes {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
  HEAD = 'HEAD',
  OPTION = 'OPTIONS'
}

export type KeyValueRecord = Record<number, { key: string; value: string; }>;

type State = {
  queryHeaders: KeyValueRecord;
  requestTab: RequestTabs;
  requestType: RequestTypes;
  url: string
};

export const state: State = $state({
  queryHeaders: {},
  requestTab: RequestTabs.Params,
  requestType: RequestTypes.GET,
  url: ''
});

let queryParams = $derived.by(() => {
  const params = state.url.split('?');
  if (params.length < 2) {
    return {};
  }

  const queryParams: KeyValueRecord = {};
  params[1].split('&')
    .forEach((param, index) => {
      const keyValue = param.split('=');
      queryParams[index] = { key: keyValue[0], value: keyValue[1] };
    });

  return queryParams;
});

export function getQueryParams(): KeyValueRecord {
  return queryParams;
}
