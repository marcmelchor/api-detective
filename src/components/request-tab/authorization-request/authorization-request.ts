import { takeUntil } from 'rxjs';

import { ApiService, AuthorizationTypes } from '../../../services/api-service';
import './authorization-request.css';


export class AuthorizationRequest extends HTMLElement {
  static readonly HTML_TAG = 'authorization-tab';

  constructor(private api: ApiService) {
    super();
  }

  private authTypes = Object.keys(AuthorizationTypes);
  private bearerTokenSection!: HTMLDivElement;
  private bearerToken = '';
  private noAuthSection!: HTMLDivElement;

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
    body.classList.add('auth-request-container');

    const authType = document.createElement('div');
    authType.classList.add('auth-request-type');
    authType.insertAdjacentHTML(
      'afterbegin',
      `<label class="auth-request-label" for="auth-type-select"></label>`
    );

    const select = document.createElement('select');
    select.classList.add('auth-request-select');
    select.id = 'auth-type-select';
    this.fillAuthTypes(select);
    authType.appendChild(select);
    body.appendChild(authType);

    const authBody = document.createElement('div');
    authBody.classList.add('auth-request-body');
    this.noAuthSection = document.createElement('div');
    this.noAuthSection.classList.add('auth-request-body-content');
    this.noAuthSection.insertAdjacentHTML(
      'afterbegin',
      `<h5>No Auth</h5>
      <p>No Authorization needed.</p>`
    );
    this.bearerTokenSection = document.createElement('div');
    this.bearerTokenSection.classList.add('auth-request-body', 'h-100');
    const tokenContainer = document.createElement('div');
    tokenContainer.classList.add('w-100', 'd-flex', 'align-center', 'gap-1', 'h-100');
    const label = document.createElement('label');
    label.htmlFor = 'auth-request-bearer';
    label.innerHTML = 'Token:';
    const input = document.createElement('input');
    input.classList.add('w-100', 'auth-request-input');
    input.id = 'auth-request-bearer';
    input.addEventListener('input', this.handleInput.bind(this));

    tokenContainer.appendChild(label);
    tokenContainer.appendChild(input);
    this.bearerTokenSection.appendChild(tokenContainer);

    authBody.appendChild(this.noAuthSection);
    authBody.appendChild(this.bearerTokenSection);
    body.appendChild(authBody);

    container.appendChild(body);
    authRequest.append(container);

    this.onSubscribeAuth();
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

  private onSubscribeAuth() {
    this.api.authorizationTab$
      .pipe(takeUntil(this.api.unsubscribeNotifier()))
      .subscribe(authTab => {
        switch (authTab) {
          case AuthorizationTypes['Bearer Token']:
            this.bearerTokenSection.classList.remove('d-none');
            this.noAuthSection.classList.add('d-none');
            break;
          default:
            this.bearerTokenSection.classList.add('d-none');
            this.noAuthSection.classList.remove('d-none');
            break;
        }
      });
  }

  private handleInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.api.changeBearerToken(value);
  }
}

if (!customElements.get(AuthorizationRequest.HTML_TAG)) {
  customElements.define(AuthorizationRequest.HTML_TAG, AuthorizationRequest);
}
