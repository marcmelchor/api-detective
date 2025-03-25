import { takeUntil } from 'rxjs';

import { ApiService, RequestTabs } from '../../services/api-service';
import { AuthorizationRequest } from './authorization-request/authorization-request';
import { HeadersRequest } from './headers-request/headers-request';
import { ParamsRequest } from './params-request/params-request';
import './request-tab.css';


export class RequestTab extends HTMLElement {
  static readonly HTML_TAG = 'request-tab';

  constructor(private api: ApiService) {
    super();
  }

  private authComponent!: AuthorizationRequest;
  private headersComponent!: HeadersRequest;
  private paramsComponent!: ParamsRequest;
  private requestTabs = Object.keys(RequestTabs);

  init() {
    const requestTab = document.createElement(RequestTab.HTML_TAG) as RequestTab;
    const tabsContainer = this.buildComponent(requestTab);

    const paramsRequest = new ParamsRequest(this.api);
    this.paramsComponent = paramsRequest.init();
    this.paramsComponent.classList.add('border-tab-container');
    requestTab.appendChild(this.paramsComponent);

    const authRequest = new AuthorizationRequest(this.api);
    this.authComponent = authRequest.init();
    this.authComponent.classList.add('border-tab-container');
    requestTab.appendChild(this.authComponent);

    const headersRequest = new HeadersRequest(this.api);
    this.headersComponent = headersRequest.init();
    this.headersComponent.classList.add('border-tab-container');
    requestTab.appendChild(this.headersComponent);

    this.observeRequestTabs(tabsContainer);

    return requestTab;
  }

  private buildComponent(requestTab: RequestTab) {
    requestTab.classList.add('request-tab-container');

    const tabsContainer = document.createElement('div');
    tabsContainer.classList.add('request-tabs');
    this.fillTabs(tabsContainer);
    requestTab.appendChild(tabsContainer);

    const spaceTabContainer = document.createElement('div');
    spaceTabContainer.classList.add('space-tab-container');

    return tabsContainer;
  }

  private fillTabs(tabsContainer: HTMLDivElement) {
    this.requestTabs
      .forEach(tab => {
        const tabContainer = document.createElement('div');
        tabContainer.setAttribute('tabIndex', '{0}');
        tabContainer.setAttribute('type', 'button');
        tabContainer.setAttribute('value', tab);
        tabContainer.id = tab;
        tabContainer.classList.add('request-tab');

        tabContainer.insertAdjacentHTML('afterbegin', `<span>${ tab }</span>`);
        tabContainer.onclick = () => {
          this.api.changeRequestTab(tabContainer.id as RequestTabs);
        };
        tabsContainer.appendChild(tabContainer);
      });
  }

  private observeRequestTabs(tabsContainer: HTMLDivElement) {
    this.api.requestTab$
      .pipe(takeUntil(this.api.unsubscribeNotifier()))
      .subscribe(tab => {
        switch (tab) {
          case 'Params':
            this.authComponent.classList.add('d-none');
            this.headersComponent.classList.add('d-none');
            this.paramsComponent.classList.remove('d-none');
            break;
          case 'Authorization':
            this.authComponent.classList.remove('d-none');
            this.headersComponent.classList.add('d-none');
            this.paramsComponent.classList.add('d-none');
            break;
          case 'Headers':
            this.authComponent.classList.add('d-none');
            this.headersComponent.classList.remove('d-none');
            this.paramsComponent.classList.add('d-none');
            break;
          default:
            this.authComponent.classList.add('d-none');
            this.headersComponent.classList.add('d-none');
            this.paramsComponent.classList.add('d-none');
            break;
        }
        for (const div of (Array.from(tabsContainer.children) as HTMLDivElement[])) {
          if (div.id === tab) {
            div.classList.add('request-tab--active');
          } else {
            div.classList.remove('request-tab--active');
          }
        }
      });
  }
}

if (!customElements.get(RequestTab.HTML_TAG)) {
  customElements.define(RequestTab.HTML_TAG, RequestTab);
}
