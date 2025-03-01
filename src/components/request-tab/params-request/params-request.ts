import { ApiService } from '../../../services/api-service';
import './params-request.css';

type Params = {
  key: string;
  value: string;
}

export class ParamsRequest extends HTMLElement {
  static readonly HTML_TAG = 'params-request';

  constructor() {
    super();

    this.api = new ApiService();
  }

  private api!: ApiService;
  private params = new Map<string, Params>();

  create() {
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
    this.createHeader(container, paramsBody);

    paramsRequest.appendChild(container);
  }

  private createHeader(container: HTMLDivElement, paramsBody: HTMLDivElement) {
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
    container.appendChild(paramsBody);
  }
}

if (!customElements.get(ParamsRequest.HTML_TAG)) {
  customElements.define(ParamsRequest.HTML_TAG, ParamsRequest);
}
