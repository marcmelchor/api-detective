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

export class ApiService {
  private _requestType$ = new BehaviorSubject<RequestTypes>(RequestTypes.GET);
  private unsubscribe$ = new ReplaySubject<void>(1);

  requestType$ = this._requestType$.asObservable();

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
