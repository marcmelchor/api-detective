import { takeUntil, tap } from 'rxjs';

import { ApiService } from '../../services/api-service';


export class DetectiveAPI {
  constructor() {
    this.api = new ApiService();
  }

  api!: ApiService;

  getRequestType() {
    return this.api.requestType$
      .pipe(
        takeUntil(this.api.unsubscribeNotifier()),
        tap()
      );
  }
}
