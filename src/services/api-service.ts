import { BehaviorSubject, ReplaySubject } from 'rxjs';

export enum RequestTypes {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
  HEAD = 'HEAD',
  OPTIONS = 'OPTIONS'
}

export enum RequestTabs {
  Params = 'Params',
  Authorization = 'Authorization',
  Headers = 'Headers',
  Body = 'Body'
}


export class ApiService {
  private _requestTab$ = new BehaviorSubject<RequestTabs>(RequestTabs.Params);
  private _requestType$ = new BehaviorSubject<RequestTypes>(RequestTypes.GET);
  private _response$ = new BehaviorSubject<Record<string, string | number | Record<string, string | number>>>({});
  private unsubscribe$ = new ReplaySubject<void>(1);

  requestTab$ = this._requestTab$.asObservable();
  requestType$ = this._requestType$.asObservable();
  response$ = this._response$.asObservable();

  request(url: string, method: RequestTypes, body?: string, headers?: Record<string, string>) {
    return fetch(url, { body, headers, method });
  }

  changeRequestTab(tab: RequestTabs) {
    this._requestTab$.next(tab);
  }

  changeType(type: RequestTypes) {
    this._requestType$.next(type);
  }

  stopSubscriptions() {
    this.unsubscribe$.next();
  }

  unsubscribeNotifier() {
    return this.unsubscribe$.asObservable();
  }
}
