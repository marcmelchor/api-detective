import { takeUntil, tap } from 'rxjs';

import { ApiService, RequestTypes } from '../../services/api-service';


export class DetectiveAPI {
  constructor() {
    this.api = new ApiService();
  }

  api!: ApiService;
  requestTypes = Object.keys(RequestTypes).map(r => r);

  fillRequestTypes(select: HTMLSelectElement) {
    this.requestTypes
      .forEach(request => {
        const option = document.createElement('option');
        option.id = `dropdown-request-${ request }`;
        option.value = request;
        option.innerHTML = request;
        select.appendChild(option);
      });
      select.onchange = (ev) => {
        this.api.changeType(select.value as RequestTypes);
      };
  }

  getRequestType() {
    return this.api.requestType$
      .pipe(
        takeUntil(this.api.unsubscribeNotifier()),
        tap()
      );
  }

  changeRequestType(type: RequestTypes) {
    this.api.changeType(type);
  }
}
