import { BehaviorSubject, ReplaySubject } from 'rxjs';

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
  OPTIONS = 'OPTIONS'
}

export enum AuthorizationTypes {
  'No Token' = 'No Token',
  'Bearer Token' = 'Bearer Token',
}

export type QueryParams = Record<number, { key: string; value: string; }>;

export type RequestUrl = { typeOfChange: 'paramsRow' | 'url'; url: string; };


export class ApiService {
  private _authorizationTab$ = new BehaviorSubject<AuthorizationTypes>(AuthorizationTypes['No Token']);
  private _bearerToken$ = new BehaviorSubject<string>('');
  private _requestTab$ = new BehaviorSubject<RequestTabs>(RequestTabs.Params);
  private _requestType$ = new BehaviorSubject<RequestTypes>(RequestTypes.GET);
  private _response$ = new BehaviorSubject<Record<string, string | number | Record<string, string | number>>>({});
  private _requestUrl$ = new BehaviorSubject<RequestUrl>({ typeOfChange: 'url', url: '' });
  private unsubscribe$ = new ReplaySubject<void>(1);

  authorizationTab$ = this._authorizationTab$.asObservable();
  bearerToken$ = this._bearerToken$.asObservable();
  requestTab$ = this._requestTab$.asObservable();
  requestType$ = this._requestType$.asObservable();
  requestUrl$ = this._requestUrl$.asObservable();
  response$ = this._response$.asObservable();

  request(url: string, method: RequestTypes, body?: string, headers?: Record<string, string>) {
    return fetch(url, { body, headers, method });
  }

  changeBearerToken(token: string) {
    this._bearerToken$.next(token);
  }

  changeAuthType(type: AuthorizationTypes) {
    this._authorizationTab$.next(type);
  }

  changeRequestTab(tab: RequestTabs) {
    this._requestTab$.next(tab);
  }

  changeType(type: RequestTypes) {
    this._requestType$.next(type);
  }

  changeRequestUrl(url: RequestUrl) {
    this._requestUrl$.next(url);
  }

  stopSubscriptions() {
    this.unsubscribe$.next();
  }

  unsubscribeNotifier() {
    return this.unsubscribe$.asObservable();
  }
}
