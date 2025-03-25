import { ApiService, KeyValueRecord } from '../../../services/api-service';


export class HeadersRequest extends HTMLElement {
  static readonly HTML_TAG = 'headers-request';

  constructor(private api: ApiService) {
    super();
  }

  private body!: HTMLDivElement;
  private headerParams: KeyValueRecord = {};

  init() {
    const headersRequest = document.createElement(HeadersRequest.HTML_TAG) as HeadersRequest;
    this.buildComponent(headersRequest);
    console.log('HHH', headersRequest);

    return headersRequest;
  }

  private buildComponent(headersRequest: HeadersRequest) {
    const container = document.createElement('div');
    container.classList.add('tab-request-container');

    const title = document.createElement('h4');
    title.classList.add('tab-request-title');
    title.innerHTML = 'Headers';
    container.appendChild(title);

    const paramsBody = document.createElement('div');
    paramsBody.classList.add('params-request-body');
    this.createHeader(paramsBody);

    this.body = document.createElement('div');
    this.body.classList.add('params-request-items');
    this.createItems(paramsBody);

    container.appendChild(paramsBody);
    headersRequest.appendChild(container);
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
}

if (!customElements.get(HeadersRequest.HTML_TAG)) {
  customElements.define(HeadersRequest.HTML_TAG, HeadersRequest);
}
