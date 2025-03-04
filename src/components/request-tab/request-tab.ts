import { takeUntil } from 'rxjs';

import { ApiService, RequestTabs } from '../../services/api-service';
import './request-tab.css';


export class RequestTab extends HTMLElement {
  static readonly HTML_TAG = 'request-tab';

  constructor() {
    super();

    this.api = new ApiService();
  }

  private api!: ApiService;
  private requestTabs = Object.keys(RequestTabs);

  create() {
    const requestTab = document.createElement(RequestTab.HTML_TAG) as RequestTab;
    this.buildComponent(requestTab);

    return requestTab;
  }

  private buildComponent(requestTab: RequestTab) {
    requestTab.classList.add('request-tab-container');

    const tabsContainer = document.createElement('div');
    tabsContainer.classList.add('request-tabs');
    this.fillTabs(tabsContainer);
    requestTab.appendChild(tabsContainer);
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

        const tabSpan = document.createElement('span');
        tabSpan.innerHTML = tab;
        tabContainer.appendChild(tabSpan);
        tabContainer.onclick = () => {
          this.api.changeRequestTab(tabContainer.id as RequestTabs);
        };
        tabsContainer.appendChild(tabContainer);
      });
    this.observeRequestTabs(tabsContainer);
  }

  private observeRequestTabs(tabsContainer: HTMLDivElement) {
    this.api.requestTab$
      .pipe(takeUntil(this.api.unsubscribeNotifier()))
      .subscribe(tab => {
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
