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

    const header = document.createElement('div');
    header.classList.add('params-request-header');

    const key = document.createElement('span');
    key.classList.add('params-request-header-key-value');
    key.innerHTML = 'Key';
    header.appendChild(key);

    const value = document.createElement('span');
    value.classList.add('params-request-header-key-value');
    value.innerHTML = 'Value';
    header.appendChild(value);

    const actions = document.createElement('span');
    actions.classList.add('params-request-header-actions');
    actions.innerHTML = 'Actions';
    header.appendChild(actions);

    paramsBody.appendChild(header);
    container.appendChild(paramsBody);
    paramsRequest.appendChild(container);
  }
}

if (!customElements.get(ParamsRequest.HTML_TAG)) {
  customElements.define(ParamsRequest.HTML_TAG, ParamsRequest);
}
