import { takeUntil } from 'rxjs';

import { ApiService, QueryParams } from '../../../services/api-service';
import './params-request.css';


export class ParamsRequest extends HTMLElement {
  static readonly HTML_TAG = 'params-request';

  constructor(private api: ApiService) {
    super();
  }

  private body!: HTMLDivElement;
  private queryParams: QueryParams = {};

  init() {
    const paramsRequest = document.createElement(ParamsRequest.HTML_TAG) as ParamsRequest;
    this.buildComponent(paramsRequest);

    return paramsRequest;
  }

  private buildComponent(paramsRequest: ParamsRequest) {
    const container = document.createElement('div');
    container.classList.add('params-request-container');

    const title = document.createElement('h4');
    title.classList.add('params-request-title');
    title.innerHTML = 'Query Params';
    container.appendChild(title);

    const paramsBody = document.createElement('div');
    paramsBody.classList.add('params-request-body');
    this.createHeader(paramsBody);

    this.body = document.createElement('div');
    this.body.classList.add('params-request-items');
    this.createItems(paramsBody);

    container.appendChild(paramsBody);
    paramsRequest.appendChild(container);
    this.subOnRequestUrl();
  }

  private createHeader(paramsBody: HTMLDivElement) {
    paramsBody.insertAdjacentHTML(
      'afterbegin',
      `
        <div class="params-request-header">
          <span class="params-request-header-key-value">Key</span>
          <span class="params-request-header-key-value">Value</span>
          <span class="params-request-header-actions">Actions</span>
        </div>
      `
    );
  }

  private createItems(paramsBody: HTMLDivElement) {
    paramsBody.insertAdjacentElement(
      'beforeend',
      this.body
    );
  }

  private subOnRequestUrl() {
    this.api.requestUrl$
      .pipe(takeUntil(this.api.unsubscribeNotifier()))
      .subscribe(url => {
        if (!url || !url.length) {
          this.queryParams = {};
          this.body.innerHTML = '';
          return;
        }

        const params = url.split('?')[1];
        if (!params || !params.length) {
          this.queryParams = {};
          this.body.innerHTML = '';
          return;
        }

        this.queryParams = {};
        params.split('&')
          .forEach((query, idx) => {
            const queryKeyValue = query.split('=');
            this.queryParams[idx] = { key: queryKeyValue[0], value: queryKeyValue[1] };
          });
        const items: string[] = [];
        Object.values(this.queryParams)
          .forEach(query => {
            items.push(`
              <div class="row">
                <span
                  class="item-key-value"
                  title="${ query.key ?? '' }">${ query.key ?? '' }
                </span>
                <span
                  class="item-key-value"
                  title="${ query.value ?? '' }">${ query.value ?? '' }
                </span>
                <span class="item-actions">
                  <img src="" />
                </span>
              </div>
            `);
          });
        this.body.innerHTML = items.join('');
      });
  }
}

if (!customElements.get(ParamsRequest.HTML_TAG)) {
  customElements.define(ParamsRequest.HTML_TAG, ParamsRequest);
}
