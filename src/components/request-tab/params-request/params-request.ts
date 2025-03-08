import { takeUntil } from 'rxjs';

import addIcon from '../../../assets/icons/add.svg';
import deleteIcon from '../../../assets/icons/delete.svg';

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
          <div class="params-request-header-actions"></div>
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
        this.body.innerHTML = '';

        const addQuery = document.createElement('div');
        addQuery.classList.add('add-query');
        const add = document.createElement('img');
        add.src = addIcon;
        add.title = 'Add query parameter';
        addQuery.appendChild(add);

        if (!url || !url.length) {
          this.queryParams = {};
          this.body.appendChild(addQuery);
          return;
        }

        const params = url.split('?')[1];
        if (!params || !params.length) {
          this.queryParams = {};
          this.body.appendChild(addQuery);
          return;
        }

        this.queryParams = {};
        params.split('&')
          .forEach((query, idx) => {
            const queryKeyValue = query.split('=');
            this.queryParams[idx] = { key: queryKeyValue[0], value: queryKeyValue[1] };
          });

        this.buildRows(url);
        this.body.appendChild(addQuery);
      });
  }

  private buildRows(url: string) {
    Object.values(this.queryParams)
      .forEach((query, index) => {
        const row = document.createElement('div');
        row.classList.add('row');

        const key = document.createElement('span');
        key.classList.add('item-key-value');
        key.innerHTML = query.key ?? '';
        row.appendChild(key);

        const value = document.createElement('span');
        value.classList.add('item-key-value');
        value.innerHTML = query.value ?? '';
        row.appendChild(value);

        const actions = document.createElement('div');
        actions.classList.add('item-actions');
        const icon = document.createElement('img');
        icon.onclick = () => this.deleteQueryParam(url, index);
        icon.src = deleteIcon;
        icon.title = 'Remove query parameter';
        actions.appendChild(icon);
        row.appendChild(actions);

        this.body.appendChild(row);
      });
  }

  private deleteQueryParam(url: string, index: number) {
    const splitUrl = url.split('?');

    const pureUrl = splitUrl[0];
    const params = splitUrl[1];

    const query = params.split('&')
      .filter((_, i) => index !== i)
      .join('&');

    this.api.changeRequestUrl(`${ pureUrl }?${ query }`);
  }
}

if (!customElements.get(ParamsRequest.HTML_TAG)) {
  customElements.define(ParamsRequest.HTML_TAG, ParamsRequest);
}
