import { ApiService, AuthorizationTypes } from '../../../services/api-service';

import './authorization-request.css';


export class AuthorizationRequest extends HTMLElement {
  static readonly HTML_TAG = 'authorization-tab';

  constructor(private api: ApiService) {
    super();
  }

  private authTypes = Object.keys(AuthorizationTypes);
  private noAuthSection!: HTMLDivElement;
  private bearerTokenSection!: HTMLDivElement;

  init() {
    const authRequest = document.createElement(AuthorizationRequest.HTML_TAG) as AuthorizationRequest;
    this.buildComponent(authRequest);

    return authRequest;
  }

  private buildComponent(authRequest: AuthorizationRequest) {
    const container = document.createElement('div');
    container.classList.add('tab-request-container');

    const title = document.createElement('h4');
    title.classList.add('tab-request-title');
    title.innerHTML = 'Authorization';
    container.appendChild(title);

    const body = document.createElement('div');
    body.classList.add('auth-request-body');

    const authType = document.createElement('div');
    authType.classList.add('auth-request-type');
    authType.insertAdjacentHTML(
      'afterbegin',
      `<label for="auth-type-select"></label>`
    );

    const select = document.createElement('select');
    select.classList.add('auth-request-select');
    select.id = 'auth-type-select';
    this.fillAuthTypes(select);
    authType.appendChild(select);
    body.appendChild(authType);
    container.appendChild(body);

    authRequest.append(container);
  }

  private fillAuthTypes(select: HTMLSelectElement) {
    this.authTypes
      .forEach(type => {
        select.insertAdjacentHTML(
          'beforeend',
          `<option value="${ type }">${ type }</option>`);
      });
    select.onchange = value => {
      const target = value.target as HTMLSelectElement;
      this.api.changeAuthType(target.value as AuthorizationTypes);
    };
  }
}

if (!customElements.get(AuthorizationRequest.HTML_TAG)) {
  customElements.define(AuthorizationRequest.HTML_TAG, AuthorizationRequest);
}
