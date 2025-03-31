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
  queryParams: KeyValueRecord;
  requestTab: RequestTabs;
  requestType: RequestTypes;
  url: string
};

export const state: State = $state({
  queryParams: {},
  requestTab: RequestTabs.Params,
  requestType: RequestTypes.GET,
  url: ''
});
